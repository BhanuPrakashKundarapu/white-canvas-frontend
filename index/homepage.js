// import React from 'react'

// function Home({setLoginUser}) {
//     return ( 
//        <div>
//          <h1> Home page</h1>
//         <button onClick={()=>setLoginUser({})}> Logout</button>

//        </div>
//      );
// }

// export default Home;



import React, { useRef, useState, useEffect } from "react";
import Profile from "../css/profile";
import "./homepage.css";
import canvas2image from 'http://hongru.github.io/proj/canvas2image/canvas2image.js'

export default function Canvas({setLoginUser}) {

  // function Draw(){
  //   var canvas=document.getElementsByClassName('.board')
  //   document.getElementsByClassName(".theimage").src=canvas.toDataURL("image/png")
  //   canvas2image.saveAsPNG(canvas);
  // }



  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#3B3B3B");
  const [size, setSize] = useState("3");
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const timeout = useRef(null);
  const [cursor, setCursor] = useState("default");

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");

    //Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // canvas.color=window.red;

    //Load from localstorage
    const canvasimg = localStorage.getItem("canvasimg");
    if (canvasimg) {
      var image = new Image();
      ctx.current = canvas.getContext("2d");
      image.onload = function () {
        ctx.current.drawImage(image, 0, 0);
        setIsDrawing(false);
      };
      image.src = canvasimg;
    }

  }, [ctx]);

  const startPosition = ({ nativeEvent }) => {
    setIsDrawing(true);
    draw(nativeEvent);
  };

  const finishedPosition = () => {
    setIsDrawing(false);
    ctx.current.beginPath();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");
    ctx.current.lineWidth = size;
    ctx.current.lineCap = "round";
    ctx.current.strokeStyle = color;

    ctx.current.lineTo(nativeEvent.clientX, nativeEvent.clientY);
    ctx.current.stroke();
    ctx.current.beginPath();
    ctx.current.moveTo(nativeEvent.clientX, nativeEvent.clientY);

    if (timeout.current !== undefined) clearTimeout(timeout.current);
    timeout.current = setTimeout(function () {
      var base64ImageData = canvas.toDataURL("image/png");
      localStorage.setItem("canvasimg", base64ImageData);
    }, 400);
  };

  const clearCanvas = () => {
    localStorage.removeItem("canvasimg");
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //Passing clear screen
    if (timeout.current !== undefined) clearTimeout(timeout.current);
    timeout.current = setTimeout(function () {
      var base64ImageData = canvas.toDataURL("image/png");
      localStorage.setItem("canvasimg", base64ImageData);
    }, 400);
  };

  const getPen = () => {
    setCursor("default");
    setSize("3");
    setColor("#3B3B3B");
  };

  const eraseCanvas = () => {
    setCursor("grab");
    setSize("20");
    setColor("#FFF");

    if (!isDrawing) {
      return;
    }
  };

  return (
    <div className='body unselectable'>
    {/* <h1>Canvas</h1> */}
      <div className="canvas-btn">
      <div className="Pallet">
      <h4>whiteBoard</h4>
      <br></br>

      <div className="pencil-div">
      <button onClick={getPen} className="btn-width input-box pencil">
          Pencil
        </button> 
        </div>
        
        <hr></hr>
        <br></br>
        <div className="btn-width color-pallet">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className='input-box'/>
          <select
            className="btn-width"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option> 1 </option>
            <option> 3 </option>
            <option> 5 </option>
            <option> 10 </option>
            <option> 15 </option>
            <option> 20 </option>
            <option> 25 </option>
            <option> 30 </option>
          </select> 
        </div>
        <br></br>

        <div className="buttons">
        <button onClick={clearCanvas} className="btn-width">
          Clear
        </button>
       
          <button onClick={eraseCanvas} className="btn-width">
            Eras
          </button>
        <div className="memory">
        <button  className="btn-width save">
            save
          </button>
        </div>
        
        </div>

      </div>
      <div className="profile">
                
      </div>
      <div className="logout">
      <button onClick={()=>setLoginUser({})} id="logout"> Logout</button>
    
      </div>
      </div>
      <canvas
       style={{ cursor: cursor }}
        onMouseDown={startPosition}
        onMouseUp={finishedPosition}
        onMouseMove={draw}
        ref={canvasRef}
        className="board"
      />
     <div className="profile-picture"><Profile/></div>
     <div className="record"> <img src="" id="theimage"></img> </div>
    </div>
  );

}

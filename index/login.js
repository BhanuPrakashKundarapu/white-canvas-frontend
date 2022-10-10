import React ,{useState}from 'react';
import '../Login/login.css'
import Googin from '../../src/Google/Login/login';
import image from './Svg/icons8-google-48.png';
import axios from 'axios'
import {useHistory} from "react-router-dom"
import Register from './Register';

function Login({setLoginUser}) {
    const history=useHistory()

    const [user,setUser]=useState({
        email:"",
        password:"",
        // male:"",
        // female:""
    })
    
    const handleChange=(e)=>{
        const {name,value}=e.target
        setUser({
            ...user,
            [name]:value
        })
    }

    const login=()=>{
        axios.post("http://localhost:9002/login",user)
        .then(res=>{alert(res.data.message)
            setLoginUser(res.data.user)
            history.push("/");
            
        })
    }

    return (
        <div className='Signin'>
            <div className='Heading' >
                <h1>Log in to continue</h1> <br></br>
            </div>
            <div className='Input-div'>
            { console.log("user" ,user)}
                <input type={'text'}        name="email"       value={user.email}      placeholder={"Email id"}        className='user-id'   onChange={handleChange} /> <br/>
                <input type={'password'}    name="password"    value={user.password}      placeholder={"Password"}      className='password'  onChange={handleChange} /> <br/>
                {/* <a href='./App.js'> Forget password ?</a> */}
                <br/>

                <input type={'submit'} className="login" onClick={login}></input>
                <br/>

                  <div className='span'> Don't have an account? <a href='Register'> Signin</a> </div><br></br>
               
                {/* <Googin/> */}
            </div>
        </div>

     );
}

export default Login; 
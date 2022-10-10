import React,{useState} from 'react'
import "../Register/Register.css"
import axios from 'axios'
import {useHistory} from "react-router-dom"
import Login from './login'
import Profile from '../css/profile'
function Register() {
    const history=useHistory()

    const [user,setUser]=useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        reEnterPassword:"",
        
        // male:"",
        // female:""
    })

    const handleChange=(e)=>{
        const {name,value}=e.target
        setUser({
            ...user,
            [name]:value
           
        })
        // console.log(e.target)
    }
    

    const register =()=>{
       
        const {name ,email,phone,password,reEnterPassword }=user
        if(name && email && phone && password  && (password===reEnterPassword)){
            // alert("succes")
            axios.post("http://localhost:9002/register",user)
            .then(res=>{
                alert(res.data.message)
                history.push("/Login")
            }) 
        }else{
            alert("unsuccess")
        }
    }
    return ( 
        <div> 
            <h1> Register</h1> 
            {/* <form onSubmit={'get'}> */}
            <div className='Form'> 
            { console.log("user",user)}
            <div className='details'>
                <div className='child' > <p>Name</p>               <input type={'text'}        name="name"                  value={user.name}               id="firstName"       placeholder='First name'            onChange={handleChange} /></div>  <br/>
                <div className='child' > <p>Email</p>              <input type={'email'}       name="email"                 value={user.email}              id="email"           placeholder='Email'                 onChange={handleChange} /></div>   <br/>
                <div className='child' > <p>phone Number</p>       <input type={'tel'}         name="phone"                 value={user.phone}              id="phone number"    placeholder='phone number'          onChange={handleChange} /></div>   <br/>
                <div className='child' > <p>Password </p>          <input type={'password'}  minLength="8"  name="password"              value={user.password}           id="Password"        placeholder='min 8 character'       onChange={handleChange} /></div>  <br/>
                <div className='child' > <p>re enter password</p>  <input type={'password'}    name="reEnterPassword"       value={user.reEnterPassword}    id="Password"        placeholder='re enter the password' onChange={handleChange} /></div>  <br/>  
                 <br></br>
                 <input type={'submit'} className='Clicktosubmit' onClick={register}></input> <br></br> <br></br>
                 <div className='span'> Already have an account? <a href='Login'> Login</a> </div><br></br>
                 

            </div>
            </div>
            {/* </form> */}
        </div>
     );
}

export default Register;
import React, { useState } from 'react'
import './CSS/App.css'

import Register from './Register';
import Login from './login';
import Home from './homepage';

import Naya from './svg/Nayaicon.jpg';

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";


function App() {
  const [user,setLoginUser]=useState({
    // name:"",
    // email:"",
    // password:""
  })
  return (
    <div className="App">
     <header className='header'> <img src={Naya} alt="Naya"/> </header>
     <Router>
   <Switch> 
      <Route exact path='/' >
      {
        user &&user._id
        ?
        <Home setLoginUser={setLoginUser}/>
        :
        <Login setLoginUser={setLoginUser}/>
      }
         </Route>
      <Route path='/Login'>  <Login setLoginUser={setLoginUser}/>  </Route> 

      <Route path='/Register'>  <Register/> </Route> 
   </Switch> 
</Router>
    </div>
  );
}

export default App;


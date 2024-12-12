import "./profile.css";
import logo from "./components/assets/Logo transparent.png";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function login() {
  const [email, setEmail] = useState("");
  const [code , setCode] = useState(null);
  const [userCode , setUserCode] = useState(null);
  const Navigate = useNavigate();
  
  const submit = async () => {
    if (code !== userCode) {
      console.log("ENTER VALID CODE");
    }
    else{
      try {
        const response = await axios.post('https://tanked-up-backend.onrender.com/login/token', { email } , {withCredentials:true});
        console.log(response.data);
        Navigate('/');
        
      } catch (error) {
        console.log(error);
        
      }
      
    }
  }


  const sendCode = async () => {
    try {
      const response = await axios.post('https://tanked-up-backend.onrender.com/login', { email })
      console.log(response.data);
      setCode(response.data);

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className="mainContainer">

      <div className="emailVerification">
        <div className="logoContainer">
          <img className="logo" src={logo} alt="Tankedup" />
        </div>
        <div className="verification">
          <p className="Login">Log in</p>
          <p>Enter your Email and we'll send you a login code</p>
          <p className="email">Email</p>
          <input type="email" className="enterEmail" name="email" onChange={(e) => { setEmail(e.target.value) }} required />
          <Link className="sendCode" onClick={sendCode}>SEND CODE</Link>
          <p className="code">Enter Code</p>
          <input type="number" name="code" className="enterCode" onChange={(e) => { setUserCode(e.target.value) }} required />
        </div>
        <Link className="submitBtn"  onClick={submit}>SUBMIT</Link>
        <Link className="register" to="/Register">Register ?</Link>
      </div>
    </div>
  )
}

export default login

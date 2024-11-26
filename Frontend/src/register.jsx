import "./register.css";
import logo from "./components/assets/Logo transparent.png";
import {Link, useNavigate} from  'react-router-dom';
import axios from 'axios';
import { useState } from "react";

function Register() {

  const [email , setEmail] = useState("");
  const [username , setUsername] = useState('')
  const navigate = useNavigate();
  
  async function handleRegister (){

    try {
      const response = await axios.post('http://localhost:8000/register' , {email , username});
      console.log(response.data);
      navigate('/Login');

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
          <p className="Login">Register</p>
        <p>Join Our Community</p>
        <p className="code">Username</p>
        <input type="text" name="code"className="enterCode" onChange={(e) => {setUsername(e.target.value)}} required/>
        <p className="email">Email</p>
        <input type="email" className="enterEmail" name="email" onChange={(e) => {setEmail(e.target.value)}} required />
        </div>
        <Link className="submitBtn"  onClick={handleRegister} >REGISTER</Link> 
        <Link className="login" to="/Login">Login ?</Link>
      </div>
    </div>
  )
}

export default Register

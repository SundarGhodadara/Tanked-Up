import "./profile.css";
import logo from "./components/assets/Logo transparent.png";
import {Link} from  'react-router-dom';

function profile() {
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
        <input type="email" className="enterEmail" name="email" required />
        <p className="code">Enter Code</p>
        <input type="number" name="code"className="enterCode" required/>
        </div>
        <Link className="submitBtn" >SUBMIT</Link> 
      </div>
    </div>
  )
}

export default profile

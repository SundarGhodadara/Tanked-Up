import { useState } from "react"
import "./Contact.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Contact() {

  const [email , setEmail] = useState("");
  const [name , setName] = useState("");
  const [message , setMessage] = useState("");
  const navigate = useNavigate();

  async function handleContact (){

    try {
      const response = await axios.post('https://tanked-up-backend.onrender.com/contact' , {email , name , message});
      console.log(response.data);
      navigate('/contact');
      
      setEmail(null);
      setName(null);
      setMessage(null);

    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
    <div className="Container">
      <div className="Contact_Us">
        <h1>CONTACT US</h1>
        <div className="Name_Email">
          <input type="text" className="nameinput" placeholder="NAME" onChange={(e) => {setName(e.target.value)}} required/>
          <input type="email" className="emailinput" placeholder="EMAIL" onChange={(e) => {setEmail(e.target.value)}} required/>
        </div>
        <div className="Message">
          <textarea name="message" cols="30" rows="10" placeholder="MESSAGE" onChange={(e) => {setMessage(e.target.value)}} required></textarea>
        </div>
        <div className="Send_Btn" onClick={handleContact}>SEND MESSAGE</div>
      </div>
    </div>
    <div className="support">
      <p>Call or Whatsapp us <u>+918866718858</u></p>
      <p>Email us <u>support@tankedup.com</u></p>
    </div>
    </>
  )
}

export default Contact

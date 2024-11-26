import "./Contact.css"

function Contact() {
  return (
    <>
    <div className="Container">
      <div className="Contact_Us">
        <h1>CONTACT US</h1>
        <div className="Name_Email">
          <input type="text" className="nameinput" placeholder="NAME" />
          <input type="email" className="emailinput" placeholder="EMAIL" />
        </div>
        <div className="Message">
          <textarea name="message" cols="30" rows="10" placeholder="MESSAGE"></textarea>
        </div>
        <div className="Send_Btn">SEND MESSAGE</div>
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

import './Footer.css';
import logo from '../components/assets/Logo transparent.png'
import made from '../components/assets/MadeInIndia.png'
import payment from '../components/assets/security.png'
import shipping from '../components/assets/time.png'

function Footer() {
  return (
    <div className='end-container'>
      <div className="services">
        <div className="service">
          <img src={payment} alt="" />
          <h2>SECURE PAYMENTS</h2>
        </div>
        <div className="service">
          <img src={made} alt="" />
          <h2>MADE IN INDIA</h2>
        </div>
        <div className="service">
          <img src={shipping} alt="" />
          <h2>SHIPPING WITHIN 5 DAYS</h2>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer">
          <div className="about">
            <img src={logo} alt="" />
            <h2>ABOUT</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta suscipit dolorum architecto aspernatur, eius corrupti, vel quo nam culpa ab obcaecati, unde sint! Sapiente voluptate veritatis nulla velit, beatae sint pariatur, dignissimos molestias tempora numquam magni rerum est quibusdam animi esse commodi ullam maiores facere delectus nobis dolores accusantium modi.</p>
          </div>
          <div className="link-container">
            <div className="links">
              <h2>FOOTER MENUS</h2>
              <ul><li>Search</li>
                <li>About Us </li>
                <li>Contact Us </li>
                <li>Exchange Request</li></ul>
            </div>
            <div className="links">
              <h2>POLICIES</h2>
              <ul><li>Privacy Policy</li>
                <li>Return/Exchange Policy</li>
                <li>Shipping Policy</li>
                <li>Term OF Service</li></ul>
            </div>
          </div>
          <div className="mails">
            <h2>NEWSLETTER</h2>
            <p>Sign up to our newsletter to receive exclusive offers.</p>
            <input type="email" name="email" placeholder='E-mail' />
            <a href="#" className="bn13">SUBSCRIBE</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

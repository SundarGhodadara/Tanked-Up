import './nav.css';
import { useState } from 'react';
import logo from '../components/assets/Logo transparent.png';
import profile from '../components/assets/p-40.gif';
import cart from '../components/assets/cart.gif';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="navbar" id="mainNav">
        <div className="nav-container">
        <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="nav-logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/Home">HOME</Link>
            <Link to="/Best sellers">BEST SELLERS</Link>
            <Link to="/Shop">SHOP</Link>
            <Link to="/Contact">CONTACT</Link>
          </div>
          <div className="nav-icon">
            <Link to="/Profile">
              <img src={profile} alt="Profile" />
            </Link>
            <Link to="/Cart">
              <img src={cart} alt="Cart" />
            </Link>
          </div>
          
        </div>
      </nav>
    </div>
  );
}

export default Navbar;


import './nav.css';
import logo from '../components/assets/Logo transparent.png';
import profile from '../components/assets/p-40.gif';
import cart from '../components/assets/cart.gif';


function Navbar({ onMenuClick}) {
  
  return (
    <div>
      <nav className="navbar" id="mainNav">
        <div className="nav-container">
          <div className="nav-logo">
            <img src={logo} alt="" />
          </div>
          <div className="nav-menu">
            <li onClick={() => onMenuClick('Home')}>HOME</li>
            <li onClick={() => onMenuClick('BestSelling')}>BEST SELLERS</li>
            <li onClick={() => onMenuClick('Shop')}>SHOP</li>
            <li onClick={() => onMenuClick('Contact')}>CONTACT</li>
          </div>
          <div className="nav-icon">
            <li><img onClick={() => onMenuClick('Profile')} src={profile} alt="" /></li>
            {/* Instead of Link, call navigateToCart function onClick */}
            <li onClick={() => onMenuClick('Cart')}><img src={cart} alt="" /></li>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

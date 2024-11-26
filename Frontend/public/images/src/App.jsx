import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Main from './components/Home/Main.jsx';
import Arrivals from './components/Home/Arrivals.jsx';
import Bestseller from './components/Home/Bestseller.jsx';
import Footer from './components/Footer.jsx';
import Bestselling from './components/Bestselling/Bestselling.jsx';
import Shop from './components/Shop/Shop.jsx';
import Contact from './components/Contact/Contact.jsx';
import Profile from './profile.jsx';
import Cart from './cart.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  
  const [currentPage, setCurrentPage] = useState('Home');

  const handleMenuClick = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return (
          <>
            <Main />
            <Arrivals />
            <Bestseller />
          </>
        );
      case 'BestSelling':
        return <Bestselling />;
      case 'Shop':
        return <Shop />;
      case 'Contact':
        return <Contact />;
      case 'Profile':
        return <Profile />
      case 'Cart':
        return <Cart />
      default:
        return (
          <>
            <Main />
            <Arrivals />
            <Bestseller />
          </>
        );
    }
  };

  return (
    <div>
      <Router>
      <Navbar onMenuClick={handleMenuClick} />
      {renderPage()}
      <Footer />
      </Router>
    </div>
  );
}

export default App;

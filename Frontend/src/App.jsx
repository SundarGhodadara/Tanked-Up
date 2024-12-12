// import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Main from './components/Home/Main.jsx';
import Arrivals from './components/Home/Arrivals.jsx';
import Bestseller from './components/Home/Bestseller.jsx';
import Footer from './components/Footer.jsx';
import Bestselling from './components/Bestselling/Bestselling.jsx';
import Shop from './components/Shop/Shop.jsx';
import Contact from './components/Contact/Contact.jsx';
import Login from './login.jsx';
import Cart from './cart.jsx';
import Register from './register.jsx';
import Profile from './profile.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserProfile from './components/UserProfile/userProfile.jsx';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar /><Main /><Arrivals /><Bestseller /><Footer /></>
    },
    {
      path: '/Best Sellers',
      element: <><Navbar /><Bestselling /><Footer /></>
    },
    {
      path: '/Shop',
      element: <><Navbar /><Shop /><Footer /></>,
      children:[
        {
          path: '/Shop/:category'
        }
      ]
    },
    {
      path: '/Contact',
      element: <><Navbar /><Contact /><Footer /></>
    },
    {
      path: '/Login',
      element: <><Navbar /><Login /><Footer /></>
    },
    {
      path: '/Register',
      element: <><Navbar /><Register /><Footer /></>
    },
    {
      path:'/Profile',
      element: <><Navbar /><Profile /><Footer /></>
    },
    {
      path:'/UserProfile',
      element: <><Navbar /><UserProfile /><Footer /></>
    },
    {
      path: '/Cart',
      element: <><Navbar /><Cart /><Footer /></>
    }
  ])
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}













// function App() {

//   const [currentPage, setCurrentPage] = useState('Home');

//   const handleMenuClick = (page) => {
//     setCurrentPage(page);
//   };

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'Home':
//         return (
//           <>
//             <Main />
//             <Arrivals />
//             <Bestseller />
//           </>
//         );
//       case 'BestSelling':
//         return <Bestselling />;
//       case 'Shop':
//         return <Shop />;
//       case 'Contact':
//         return <Contact />;
//       case 'Profile':
//         return <Profile />
//       case 'Cart':
//         return <Cart />
//       default:
//         return (
//           <>
//             <Main />
//             <Arrivals />
//             <Bestseller />
//           </>
//         );
//     }
//   };

//   return (
//     <div>
//       <Router>
//       <Navbar onMenuClick={handleMenuClick} />
//       {renderPage()}
//       <Footer />
//       </Router>
//     </div>
//   );
// }

export default App;


import './Arrivals.css';
// import jsonData from './NewArrivals.json';
import { Link } from 'react-router-dom';
import { useState , useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

function arrivals() {

const [newArrivals , setNewArrivals] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get('https://tanked-up-backend.onrender.com/displayItems/newArrivals', { withCredentials: true });
        console.log(response.data);
        setNewArrivals(response.data);

      } catch (error) {
        console.log(error);
      }
    };
    getProductDetails();
  }, []);


  return (
    <div className='arrival-container'>
      <div className="text-container">
        <h3>LATEST DROPS</h3>
        <h1>NEW ARRIVALS</h1>
      </div>
      <div className="arrival-cards">
        {newArrivals?newArrivals.map((e) => {
          return (
            <div className="card" key={e._id}>
              <img src={e.images[0]} alt="" />
            </div>
          )
        }):<div className='loadingContainer'>
        <Loader/> </div>}
      </div>
      <Link className="bn13" to="/Shop">VIEW MORE</Link>
    </div>
  )
}

export default arrivals


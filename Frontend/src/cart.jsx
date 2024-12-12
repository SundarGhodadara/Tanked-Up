import { useState, useEffect } from 'react';
import './cart.css';
import ConfirmationPopup from './components/ConfirmationPopup'; // Ensure the correct import path
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [itemArray, setItemArray] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // State to manage the popup visibility
  const navigate = useNavigate();

  useEffect(() => {
    try {
      let items = localStorage.getItem("Items");
      if (items != undefined) {
        setItemArray(JSON.parse(items));
      }
    } catch (error) {
      setItemArray([]);
    }

  }, []);

  const validation = async () => {
    const response = await axios.get('https://tanked-up-backend.onrender.com/login/verifyUser', { withCredentials: true });

    console.log(response.data);

    if (response.data == 'Not LoggedIn') {
      navigate('/Login')
    }

  }



  useEffect(() => {
    // Calculate total amount considering the quantity of each item
    const total = itemArray.reduce((acc, item) => {
      return acc + (parseFloat(item.productPrice) * (item.quantity || 1));
    }, 0);
    setTotalAmount(total);
  }, [itemArray]);

  const removeFromCart = (id) => {
    const updatedItems = itemArray.filter(item => item._id !== id);
    setItemArray(updatedItems);
    localStorage.setItem("Items", JSON.stringify(updatedItems));
  };

  const handleQuantityChange = (id, value) => {
    const updatedItems = itemArray.map(item => {
      if (item._id === id) {
        return { ...item, quantity: parseInt(value, 10) || 1 };
      }
      return item;
    });

    setItemArray(updatedItems);
    localStorage.setItem("Items", JSON.stringify(updatedItems));
  };

  const handlePayment = async () => {
    try {
      // Show the confirmation popup
      validation();
      

      const orderItems = itemArray.map(item => ({
        image: item.images[0],
        productName: item.productName || "", // Ensure a default if undefined
        productDescription: item.productDescription || "",
        productPrice: item.productPrice || 0,
        productCategory: item.productCategory || "",
        selectedSizes: item.userSizes || "",
        quantity: item.quantity || 1,
      }));

      setItemArray([]);
      setShowPopup(!showPopup);
      console.log(showPopup);
      

      // Send the order to the backend
      const order = await axios.post('https://tanked-up-backend.onrender.com/placeOrder/orderConfirm', {
        items: orderItems
      }, { withCredentials: true });

      console.log("ORDER CONFIRM:", order);
      // Clear the cart after successful order
      localStorage.removeItem("Items");
      console.log(showPopup);



    } catch (error) {
      console.log(error);
    }
  };


  const closePopup = () => {
    setShowPopup(false);
  };

  if (itemArray.length <= 0) {
    return <h1 style={{ display: 'flex', justifyContent: 'center', margin: '5rem', fontSize: '25px' }}>Cart is empty</h1>;
  }


  return (
    <>
      <div className="products-container">
        <div className="items">
          {itemArray.map((item) => (
            <div className="itemCard" key={item._id}>
              <img src={item.images[0]} alt={item.productName} />
              <h3 className="productName">{item.productName}</h3>
              <h3 className="productPrice">₹ {parseFloat(item.productPrice).toFixed(2)}</h3>
              <h3 className='ProductSize'>Size: {item.userSizes}</h3>
              <div className="removeButton" onClick={() => removeFromCart(item._id)}>
                <strong>-</strong>
              </div>
              <h3 className="quantity">
                <div className="quantity-control">
                  <button className="decrease-btn" onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
                  <input
                    type="number"
                    name="numberOfProduct"
                    className="numberOfProduct"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) => handleQuantityChange(item._id, Math.max(1, parseInt(e.target.value)))}
                  />
                  <button className="increase-btn" onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
                </div>
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="totalAmount-container">
        <div className="totalAmount">
          <p>TOTAL AMOUNT: <span className='amount'> ₹ {totalAmount.toFixed(2)}</span></p>
          <div className="payment-btn" onClick={handlePayment}>PAY</div>
        </div>
      </div>

      {showPopup && (
        <ConfirmationPopup
          message="Order confirmed successfully. You will receive your product within 7 days."
          onClose={closePopup}
        />
      )}
    </>
  );
}

export default Cart;

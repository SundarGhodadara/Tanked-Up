import './userProfile.css';
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function UserProfile() {
    const navigate = useNavigate();
    const [previousOrderList, setPreviousOrderList] = useState([]);

    const handleLogout = async () => {
        try {
            await axios.post('https://tanked-up-backend.onrender.com/logout', {}, { withCredentials: true });
            navigate('/Login');
        } catch (error) {
            console.log("Error during logout:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://tanked-up-backend.onrender.com/displayItems/previousOrders', { withCredentials: true });
                const order = response.data;
                setPreviousOrderList(order);
                console.log("Fetched order data:", order); 
            } catch (error) {
                console.log('Error fetching Orders:', error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="mainProfileContainer">
            <div className="profileContainer">
                <div className="logoutBtn" onClick={handleLogout}>
                    <GoChevronLeft className='GoChevronLeft' />
                    <p className='logoutBtnText'>LOGOUT</p>
                </div>
                <p className="headingYourAccount">YOUR ACCOUNT</p>
                <p className='information'>View all your orders and manage your account information.</p>
                <div className="orderList">
                    <p className='orderHeading'>ORDERS</p>
                    <div className="prevOrder">
                        {previousOrderList.length > 0 ? (
                            previousOrderList.map((order) => (
                                <div className="orders" key={order._id}>
                                    <div className="productImage product">
                                        <img src={order.image} alt="Product" className='orderImage' />
                                    </div>
                                    <div className="productName product">{order.productName}</div>
                                    <div className="productPrice product">{order.productPrice}</div>
                                    <div className="productQuantity product">{order.productQuantity}</div>
                                    <div className="purchaseDate product">{order.purchaseDate}</div>
                                </div>
                            ))
                        ) : (
                            <p>No orders found.</p>
                        )}
                    </div>
                </div>
                <Link className="bn13" to="/Shop">CONTINUE SHOPPING</Link>
            </div>
        </div>
    );
}

export default UserProfile;

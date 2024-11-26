import { useState, useEffect } from 'react';
import './Bestseller.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import Loader from '../Loader/Loader';


function Bestseller() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bestSellingProducts, setBestSellingProducts] = useState([]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? bestSellingProducts.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === bestSellingProducts.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const response = await axios.get('http://localhost:8000/displayItems/bestSelling', { withCredentials: true });
                setBestSellingProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getProductDetails();
    }, []);

    // if (bestSellingProducts.length === 0) {
    //     return <div>Loading...</div>;
    // }

    const product = bestSellingProducts[currentIndex]; // Get the current product

    return (
        <div className="bestsell-container">
            <div className="text-container">
                <h3 className='heading'>BEST SELLING PRODUCT</h3>
                <h1>STEAL THE LOOK</h1>
            </div>

            {
                bestSellingProducts.length > 0 ?


                    <div className="pro-con">
                        <div className="prev" onClick={handlePrev}>
                            <span className="arrowLeft"> <ImArrowLeft2 /></span>
                        </div>

                        <div className="product-main-container">
                            <div className="product-container">
                                <div className="main-img">
                                    <img src={product.images[0]} alt="Main Image" />
                                </div>
                                <div className="product-img">
                                    <div className="smallProductImage">
                                        <img src={product.images[2]} alt="Product Image" className='smallImage' />
                                    </div>
                                    <h3 className="product-name">{product.productName}</h3>
                                    <h3 className="product-price">RS: {product.productPrice}</h3>
                                    <Link className="bn13" to="/Best sellers">VIEW MORE</Link>
                                </div>
                            </div>
                        </div>

                        <div className="post" onClick={handleNext}>
                            <span className="arrowRight"><ImArrowRight2 /></span>
                        </div>
                    </div> : <div className='loadingContainer'>
                        <Loader /> </div>
            }
        </div>
    );
}

export default Bestseller;

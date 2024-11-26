import { useState } from 'react';
import './Bestseller.css';
import Bestproduct from './Bestseller.json';

function Bestseller() {
    const data = Bestproduct.bestproducts || [];
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="bestsell-container">
            <div className="text-container">
                <h3 className='heading'>BEST SELLING PRODUCT</h3>
                <h1>STEAL THE LOOK</h1>
            </div>

            <div className="pro-con">
                <div className="prev" onClick={handlePrev}>
                    <button>pre</button>
                </div>

                <div className="product-main-container">
                    <div className="product-container">
                        <div className="main-img">
                            <img src={data[currentIndex].bigimage} alt="" />
                        </div>
                        <div className="product-img">
                            <div className="product">
                                <img src={data[currentIndex].productimage} alt="" />
                            </div>
                            <h3 className="product-name">{data[currentIndex].productname}</h3>
                            <h3 className="product-price">RS: {data[currentIndex].productprice} <s>{data[currentIndex].productstrikeprice}</s></h3>
                            <a href="#" className="bn13">VIEW PRODUCT</a>
                        </div>
                    </div>
                </div>

                <div className="post" onClick={handleNext}>
                    <button>post</button>
                </div>
            </div>
        </div>
    );
}

export default Bestseller;

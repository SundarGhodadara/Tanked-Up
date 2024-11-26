import tshirt from '../assets/img-4.png';
import sweet from '../assets/sweet-2.jpg';
import hoddy from '../assets/hoddy-1.png';
import pant from '../assets/pant-1.png';
import bag from '../assets/bag-2.png';
import './Main.css';
import tankedup from '../assets/tankedup-2.mp4'

function Main() {
    return (
        <div className='body-container'>
            <div className="catagory-container">
                <div className="catagory">
                    <li><span><img src={tshirt} alt="" /></span>
                        <p>OVERSIZE</p>
                    </li>
                    <li><span><img src={sweet} alt="" /></span>
                        <p>SWEETS</p>
                    </li>
                    <li><span><img src={hoddy} alt="" /></span>
                        <p>HODDIES</p>
                    </li>
                    <li><span><img src={pant} alt="" /></span>
                        <p>BAGGIES</p>
                    </li>
                    <li><span><img src={bag} alt="" /></span>
                        <p>BAGS</p>
                    </li>
                </div>
            </div>
            <div className="img-slider">
                <div className="slider-1">
                <div className="video-container">
                    <video src={tankedup} controls autoPlay loop></video>
                </div>
                <div className="content-container">
                    <h1>TRENDING WEARS</h1>
                    <div className="wears">
                        <li><img src={tshirt} alt="" /></li>
                        <li><img src={sweet} alt="" /></li>
                        <li><img src={hoddy} alt="" /></li>
                        <li><img src={pant} alt="" /></li>
                        <li><img src={pant} alt="" /></li>
                    </div>
                    <p><a href="#">@_tankedup</a></p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Main

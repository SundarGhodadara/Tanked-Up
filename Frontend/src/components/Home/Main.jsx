import tshirt from '../assets/img-4.png';
import sweet from '../assets/sweet-2.jpg';
import hoddy from '../assets/hoddy-1.png';
import pant from '../assets/pant-1.png';
import bag from '../assets/bag-2.png';
import './Main.css';
import tankedup from '../assets/tankedup-2.mp4';
import { Link } from 'react-router-dom'

function Main() {
    return (
        <div className='body-container'>
            <div className="catagory-container">
                <div className="catagory">
                    <li>
                        <Link to="/Shop/oversize">
                            <div className='cate'><img src={tshirt} alt="" /></div>
                        </Link>
                        <p>OVERSIZE</p>
                    </li>

                    <li>
                        <Link to="/Shop/sweets">
                        <div className='cate'><img src={sweet} alt="" /></div>
                        </Link>
                        <p>SWEETS</p>
                    </li>
                    <li>
                        <Link to="/Shop/hoddies">
                        <div className='cate'><img src={hoddy} alt="" /></div>
                        </Link>
                        <p>HODDIES</p>
                    </li>
                    <li>
                        <Link to="/Shop/baggies">
                        <div className='cate'><img src={pant} alt="" /></div>
                        </Link>
                        <p>BAGGIES</p>
                    </li>
                    <li>
                        <Link to="/Shop/bags">
                        <div className='cate'><img src={bag} alt="" /></div>
                        </Link>
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

export default Main;


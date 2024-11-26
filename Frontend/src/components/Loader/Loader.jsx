import React from 'react';
import loading from '../assets/loading.gif';
import "./Loader.css";

function Loader() {
  return (
    <div className='loadContainer'>
      <img src={loading} className='loader' alt="" />
      <p>Hold tight, good things take time!</p>
    </div>
  )
}

export default Loader;

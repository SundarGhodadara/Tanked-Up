import { useState } from 'react';
import './Shop.css';
import jsonData from './Shop.json';

function Shop() {
  const data = jsonData.products || [];
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const isAlreadyAdded = cartItems.find(item => item.id === product.id);
    if (isAlreadyAdded) {
      alert("Already added");
      return;
    }
    setCartItems([...cartItems, product]);
  };
  console.log(cartItems);

  const removeToCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="productContainer">
      <h1>COLLECTIONS</h1>
      <div className="filter">
        <li className='sortby-menu menu'>SORT BY</li>
        <li className='filter-menu menu'>FILTER</li>
      </div>
      <div className="products-container">
        <div className="items">
          {data.map((product) => (
            <div className="itemCard" key={product.id}>
              <img src={product.url} alt={product.productName} />
              <h3 className="productName">{product.productName}</h3>
              <h3 className='productPrice'>{product.price}</h3>
              <div className='addButton' onClick={() => addToCart(product)}>
                <strong>+</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="products-container">
        <div className="items">
          {cartItems.map((item) => (
            <div className="itemCard" key={item.id}>
              <img src={item.url} alt={item.productName} />
              <h3 className="productName">{item.productName}</h3>
              <h3 className='productPrice'>{item.price}</h3>
              <div className='removeButton' onClick={() => removeToCart(item.id)}>
                <strong>-</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// export {cartItems};
export default Shop;
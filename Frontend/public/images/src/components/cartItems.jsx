import { useState } from 'react';

export const UseCartItems = () => {
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


  return {
    addToCart,
    removeToCart,
    cartItems
  }
}


import { useState, useEffect } from 'react';
import '../Shop/Shop.css';
import ProductPopUp from '../ProductPopUp/ProductPopUp';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { GoPlus } from "react-icons/go";
import Loader from '../Loader/Loader';

function Bestselling() {
  const { category } = useParams();
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]);
  const [sortByCategory, setSortByCategory] = useState('');
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortByPrice, setSortByPrice] = useState('');
  const [cartItems, setCartItems] = useState();
  // const [bestItems , setBestItems] = useState([]);
  const [popUp, setPopUp] = useState(false);

  
  // Fetch products and filter by category if needed
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/displayItems/bestSelling', { withCredentials: true });
        console.log(response.data);

        setTimeout(()=> {
          if (category) {
            const filteredProducts = response.data.filter(item => item.productCategory === category);
            setProducts(filteredProducts);
          } else {
            setProducts(response.data);
          }
        }, 1000)
        
      } catch (error) {
        console.log(error);
      }
    };
    getProductDetails();
  }, [category]);

  // Filter products by category
  useEffect(() => {
    if (sortByCategory) {
      const sortProduct = products.filter(item => item.productCategory === sortByCategory);
      setSortedProducts(sortProduct);
    } else {
      setSortedProducts(products);
    }
  }, [sortByCategory, products]);

  // Filter products by price range
  useEffect(() => {
    const sortingWithPrice = () => {
      let categoryProducts = sortByCategory?products.filter(item => item.productCategory === sortByCategory):products;
      if (sortByPrice) {
        let filteredProducts = [];
        // console.log(categoryProducts);
        
        switch (sortByPrice) {
          case 'under-699':
            filteredProducts = categoryProducts.filter(item => item.productPrice < 700);
            break;
          case '699-999':
            filteredProducts = categoryProducts.filter(item => item.productPrice >= 699 && item.productPrice <= 999);
            break;
          case '999-1299':
            filteredProducts = categoryProducts.filter(item => item.productPrice >= 999 && item.productPrice <= 1299);
            break;
          case 'above-1299':
            filteredProducts = categoryProducts.filter(item => item.productPrice >= 1299);
            break;
          default:
            filteredProducts = categoryProducts;
            break;
        }
        setSortedProducts(filteredProducts);
      } else {
        setSortedProducts(categoryProducts);
      }
    };
    sortingWithPrice();
  }, [sortByPrice]);

  // Handle add to cart
  const addToCart = (product, e, userSizes) => {
    e.preventDefault();
    e.stopPropagation();
    const isAlreadyAdded = cartItems.find(item => item._id === product._id);
    if (isAlreadyAdded) {
      alert('Already added');
      return;
    }
    const newProduct = userSizes?{...product,userSizes}:product
    const updatedCartItems = [...cartItems, newProduct];
    setCartItems(updatedCartItems);
    localStorage.setItem('Items', JSON.stringify(updatedCartItems));
  };

  useEffect(() => {
    localStorage.setItem('Items', JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle product pop-up
  const itemPopUp = (p) => {
    setPopUp(true);
    setProduct(p);
  };

  // Handle category and price filters
  const handleChange = (event) => {
    setSortByCategory(event.target.value);
  };

  const handleFilter = (e) => {
    setSortByPrice(e.target.value);
    console.log("working");
    
  };

  return (
    <div className="productContainer">
      <h1>BEST SELLERS</h1>
      <div className="filter">
        <li className='sortby-menu menu'>
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" className='lable'>SORT BY</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortByCategory}
                label="SORT BY"
                onChange={handleChange}
                sx={{
                  border: 'none',
                  '& fieldset': {
                    border: 'none',
                  },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="oversize">OVERSIZE</MenuItem>
                <MenuItem value="sweets">SWEETS</MenuItem>
                <MenuItem value="hoddies">HODDIES</MenuItem>
                <MenuItem value="baggies">BAGGIES</MenuItem>
                <MenuItem value="bags">BAGS</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </li>
        <li className='filter-menu menu'>
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" className='lable'>FILTER BY</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortByPrice}
                label="FILTER BY"
                onChange={handleFilter}
                sx={{
                  border: 'none',
                  '& fieldset': {
                    border: 'none',
                  },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="under-699">Under 699</MenuItem>
                <MenuItem value="699-999">Between 699 - 999</MenuItem>
                <MenuItem value="999-1299">Between 999 - 1299</MenuItem>
                <MenuItem value="above-1299">Above 1299</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </li>
      </div>
      <div className="products-container">
        <div className="items">
          {sortedProducts.length>0?sortedProducts.map((product) => (
            <div className="itemCard" key={product._id} onClick={() => { itemPopUp(product); }}>
              <img src={product.images[0]} alt={product.productName} className='itemImage'/>
              <h3 className="productName">{product.productName}</h3>
              <h3 className='productPrice'>₹ {product.productPrice}</h3>
              <div className='addButton' onClick={()=>{setPopUp(true)}}>
              <GoPlus />
              </div>
            </div>
          )):<Loader/>}
        </div>
      </div>
      {popUp && <ProductPopUp setPopUp={setPopUp} addToCart={addToCart} product={product} />}
    </div>
  );
}

export default Bestselling;















// import { useState , useEffect} from 'react';
// import './Bestselling.css';
// import jsonData from './Bestselling.json';
// import axios from 'axios';
// import ProductPopUp from '../ProductPopUp/ProductPopUp';


// function Bestselling() {
//   // const data = jsonData.products || [];
//   const [cartItems, setCartItems] = useState([]);
//   const [popUp, setPopUp] = useState(false);
//   const [product, setProduct] = useState('');


//   console.log(cartItems);

//   // Handle add to cart
//   const addToCart = (product, e, userSizes) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const isAlreadyAdded = cartItems.find(item => item._id === product._id);
//     if (isAlreadyAdded) {
//       alert('Already added');
//       return;
//     }
//     const newProduct = userSizes?{...product,userSizes}:product
//     const updatedCartItems = [...cartItems, newProduct];
//     setCartItems(updatedCartItems);
//     localStorage.setItem('Items', JSON.stringify(updatedCartItems));
//   };

//    // Handle product pop-up
//    const itemPopUp = (p) => {
//     setPopUp(true);
//     setProduct(p);
//   };




// // new useEffect

// useEffect (() => {
//   const fetchBestProduct = async () => {
//     try {
//       const products = await axios.get('http://localhost:8000/displayItems/bestSelling')
//       console.log("Best Selling Products", products);
//       setCartItems(products.data)
      
//     } catch (error) {
//       console.log(error);
      
//     }
//   }
//   fetchBestProduct()
// } , [])




//   return (
//     <div className="productContainer">
//       <h1>BEST SELLERS</h1>
//       <div className="filter">
//         <li className='sortby-menu menu'>SORT BY</li>
//         <li className='filter-menu menu'>FILTER</li>
//       </div>
//       <div className="products-container">
//         <div className="items">
//         {cartItems.map((product) => (
//             <div className="itemCard" key={product._id} onClick={() => { itemPopUp(product); }}>
//               <img src={product.images[0]} alt={product.productName} className='itemImage'/>
//               <h3 className="productName">{product.productName}</h3>
//               <h3 className='productPrice'>₹ {product.productPrice}</h3>
//               <div className='addButton' onClick={()=>{setPopUp(true)}}>
//                 <strong>+</strong>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {popUp && <ProductPopUp setPopUp={setPopUp} addToCart={addToCart} product={product} />}


//     </div>
//   );

// }
// // export {cartItems};
// export default Bestselling;


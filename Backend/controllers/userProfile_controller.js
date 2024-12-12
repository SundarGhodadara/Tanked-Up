const orderModel = require('../models/userProfileModel');
const {getUser} = require('../utility/auth');
const userModel = require('../models/userModel');
const productModel = require('../models/productDetailsModel')

const handleOrder = async (req, res) => {
  try {
    const items = req.body.items;
    const token = req.cookies.AccessToken;
    console.log("Token:" , token);

    if (!token) {
      return res.status(401).json({ message: 'Access token is missing' });
    }
    
    const decoded = getUser(token);
    console.log("Decoded token:", decoded);

    const validateUser = await userModel.findOne({_id:decoded._id});
    console.log("USer:",validateUser);

    if (!validateUser) {
      return  res.status(401).json({ message: 'Invalid user' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items to order" });
    }

    const userName = validateUser.username;
    const userEmail = validateUser.email;
    // console.log("userName:" , userName);
    // console.log("userEmail:", userEmail);
    
    
    
    // Process each item in the array
    const savedOrders = await Promise.all(
      items.map(async (item) => {
        const newOrder = new orderModel({
          image:item.image,
          productName: item.productName,
          productDescription: item.productDescription,
          productPrice: item.productPrice,
          selectedSizes: item.selectedSizes,
          productCategory: item.productCategory,
          productQuantity:item.quantity,
          userName,
          userEmail,
        });

        await productModel.findByIdAndUpdate(item._id,{
          $inc: { productStock: -item.quantity }
        })

        return await newOrder.save();
      })
    );

    res.status(201).json({ message: 'Order confirmed successfully', orders: savedOrders });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error while creating order' });
  }
};

module.exports = { 
  handleOrder 
};

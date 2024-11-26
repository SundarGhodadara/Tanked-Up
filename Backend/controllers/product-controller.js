const  productModel = require('../models/productDetailsModel');


const handleProduct = async (req,res) => {
    try {
        const { productName, productPrice, productDescription, productStock, productCategory, selectedSizes, imageUrl } = req.body;
    
        // Create a new product instance
        const newProduct = new productModel({
          images:imageUrl,
          productName,
          productDescription,
          productPrice,
          productStock,
          selectedSizes,
          productCategory,
            // Images array (URLs) received from the client-side
        });
    
        // Save the product to the database
        const savedProduct = await newProduct.save();
    
        // Return the saved product
        res.status(201).json({ message: 'Product created successfully', product: savedProduct });
    
      } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error while creating product' });
      }
    };

    const handleRemoveProduct =async (req,res) => {
      try {
        const {id} = req.params;
        await productModel.findByIdAndDelete(id)
        res.status(200).json('Product Removed')
      } catch (error) {
       console.log(error);
        
      }
    }
    
module.exports ={ 
    handleProduct,
    handleRemoveProduct
}
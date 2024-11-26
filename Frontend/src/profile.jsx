
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './profile.css';
import { MdHeight, MdOutlineUploadFile } from "react-icons/md";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { height } from "@mui/system";
import { GoTrash } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";


function profile() {

  const navigate = useNavigate();
  useEffect(() => {

    // fireBase connection

    const firebaseConfig = {
      apiKey: "AIzaSyDHiZCraSZcNGlRtwPAc2oQbSx6HhajjWA",
      authDomain: "tankedup-56984.firebaseapp.com",
      projectId: "tankedup-56984",
      storageBucket: "tankedup-56984.appspot.com",
      messagingSenderId: "789715046800",
      appId: "1:789715046800:web:71268a746d0f6a6095e315"
    };

    const app = initializeApp(firebaseConfig);




    const validation = async () => {
      const response = await axios.get('http://localhost:8000/login/verifyUser', { withCredentials: true });

      console.log(response.data);

      if (response.data == 'Not LoggedIn') {
        navigate('/Login')
      }
      else if (response.data == 'Welcome Admin') {
        navigate('/Profile')
      }
      else if (response.data == 'Valid User') {
        navigate('/UserProfile')
      }
    }

    validation();

  }, []);


  // for logout

  const handleLogout = async () => {
    try {
      // Call the logout endpoint
      await axios.post('http://localhost:8000/logout', {}, { withCredentials: true });

      // Redirect to the login page
      navigate('/Login');

    } catch (error) {
      console.log("Error during logout:", error.response?.data || error.message);
    }
  };


  //upload main img
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // Store file preview URL
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Set the file state
      setPreview(URL.createObjectURL(selectedFile)); // Create and set preview URL
    }
  };


  // upload more img
  const [images, setImages] = useState([null, null, null, null]);  // 4 image slots
  const [imagePreview, setImagePreview] = useState([null, null, null, null]);  // 4 image slots

  const handleMoreFileChange = (event, index) => {
    const selectedFile = event.target.files[0];
    // console.log(index);

    if (selectedFile) {
      const updatedImages = [...images];
      updatedImages[index] = selectedFile;
      const preview = [...imagePreview]
      preview[index] = URL.createObjectURL(selectedFile);
      console.log(preview);
      setImagePreview(preview);
      setImages(updatedImages);
    }
  };

  //product Name useState
  const [productName, setProductName] = useState('');

  //price useSatate
  const [productPrice, setProductPrice] = useState(0);

  // Descriptio useState
  const [productDescription, setProductDescription] = useState('');

  //stock useState
  const [productStock, setProductStock] = useState('');

  // select avilable size
  const [selectedSizes, setSelectedSizes] = useState([]);

  // Listed Product list
  const [listedItem, setListedItem] = useState([]);




  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    let updatedSelectedSizes;
    if (checked) {
      updatedSelectedSizes = [...selectedSizes, name];
    } else {
      updatedSelectedSizes = selectedSizes.filter((size) => size !== name);
    }

    setSelectedSizes(updatedSelectedSizes);
    // console.log("Checked options:", updatedSelectedSizes);
  };

  // Product Category useState
  const [productCategory, setProductCategory] = useState('');

  //alert for success listing
  const [successListing, setSuccessListing] = useState(false)


  // const handleUploadItems = (file) => {
  //   const storage = getStorage();

  //   const storageRef = ref(storage, `items/${file.name}`);

  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on('state_changed',
  //     (snapshot) => {
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log('Upload is ' + progress + '% done');
  //       switch (snapshot.state) {
  //         case 'paused':
  //           console.log('Upload is paused');
  //           break;
  //         case 'running':
  //           console.log('Upload is running');
  //           break;
  //       }
  //     },
  //     (error) => {
  //       // Handle unsuccessful uploads
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         console.log('File available at', downloadURL);
  //         setImageUrl([...imageUrl, downloadURL])
  //         return
  //       });
  //     }
  //   );
  // }


  // handle upload item images in one array

  const [imageUrl, setImageUrl] = useState([]);
  const [isUploading, setIsUploading] = useState(false);


  //at the sumbit button clicked

  const handleListing = async () => {
    console.log(imageUrl.length);

    if (!productName || !productCategory || !productDescription || !productPrice || !productStock || !file || !images || !selectedSizes || imageUrl.length === 0 || isUploading) {
      alert("Please fill all the fields");
    }
    else {
      try {

        const response = await axios.post('http://localhost:8000/productDetails', { imageUrl, productName, productPrice, productDescription, productStock, selectedSizes, productCategory }, { withCredentials: true });

        setListedItem([...listedItem, response.data.product]);

        console.log(response.data.product);

        // console.log('images', imageUrl);

        setSuccessListing(true);
        setFile(null);
        setPreview(null);
        setImagePreview([null, null, null, null]);
        setImages([null, null, null, null]);
        setProductName('');
        setProductPrice(0);
        setProductDescription('');
        setProductStock(0);
        setProductCategory('');
        setSelectedSizes([]);

      } catch (error) {
        console.log(error);

      }


    }
  }

  //upload image function
  const uploadImages = async () => {
    setIsUploading(true)
    let urls = [];

    // Helper function for uploading files and getting the download URL
    const handleUploadItems = (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const storageRef = ref(storage, `items/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error('Upload failed: ', error);
            reject(error); // Reject the promise if the upload fails
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve(downloadURL); // Resolve the promise with the download URL
            }).catch((error) => reject(error));
          }
        );
      });
    };

    // Upload the main image
    if (file) {
      try {
        const mainImageUrl = await handleUploadItems(file);
        urls.push(mainImageUrl);
      } catch (error) {
        console.error("Error uploading main image:", error);
      }
    }

    // Upload additional images
    for (let image of images) {
      if (image) {
        try {
          const imageUrl = await handleUploadItems(image);
          urls.push(imageUrl);
        } catch (error) {
          console.error("Error uploading additional image:", error);
        }
      }
    }

    setImageUrl(urls); // Set the image URLs to state
    console.log("All image URLs:", urls); // Log all image URLs
    setIsUploading(false)
    return urls;
  };


  console.log(listedItem);

  // Remove Item - RemoveButton

  const handleRemove = async (productId) => {
    try {
      const productRemove = await axios.delete(`http://localhost:8000/productDetails/removeProduct/${productId}`)

      setListedItem((prev) => (prev.filter((item) => (item._id !== productId))));
      console.log(productRemove);

    } catch (error) {
      console.log(error);

    }
  }

  // listed Items in table -> listed item useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/displayItems', { withCredentials: true });
        setListedItem(response.data);
        console.log(listedItem)
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  return (
    <div className="adminContainer">
      <div className="logoutBtn" onClick={handleLogout}>
        <GoChevronLeft className='GoChevronLeft' />
        <p className='logoutBtnText'>LOGOUT</p>
      </div>
      <div className="listingContainer">
        <p className="listingHeading">Creat Listing ...</p>
        <div className="itemDetailsContainer">
          <p className="itemDetailsHeading">Item Details : </p>

          <div className="itemImagesContainer">

            <div className="upload-container">
              <label htmlFor="file-upload" className="upload-label">
                <div className="upload-preview">
                  {preview ? (
                    <img src={preview} alt="Uploaded Preview" className="full-upload-image" /> // Full block display
                  ) : (
                    <div className="upload-placeholder">
                      <MdOutlineUploadFile className="fileUploadeIcon" />
                      <p>Main Photo</p>
                      <p>Drop files or click to upload</p>
                    </div>
                  )}
                </div>
              </label>
              <input
                id="file-upload"
                type="file"
                className="upload-input"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            {/* for upload more images */}
            <div className="uploadMoreImages">
              <div className="image-grid">
                {imagePreview.map((image, index) => (
                  <div className="image-upload-box" key={index}>
                    <label htmlFor={`file-upload-${index}`} className="upload-label">
                      {image ? (
                        <img src={image} alt={`upload-${index}`} className="uploaded-image" />
                      ) : (
                        <span className="plus-icon">+</span> // Display + icon if no image
                      )}
                    </label>
                    <input
                      id={`file-upload-${index}`}
                      type="file"
                      className="upload-input"
                      onChange={(e) => handleMoreFileChange(e, index)}
                      accept="image/*"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          <button type="submit" className="imageUploadBtn" onClick={uploadImages}>Upload Images</button>

          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, maxwidth: '500px', minWidth: '300px' } }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Product Name" variant="outlined"
              onChange={(e) => setProductName(e.target.value)}
              // onBlur={console.log('Product Name:', productName)}
              value={productName}
            />
          </Box>


          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, maxwidth: '500px', minWidth: '300px' } }}
            noValidate
            autoComplete="off"
          >
            <TextField type="number" id="outlined-basic" label="Price" variant="outlined"
              onChange={(e) => setProductPrice(e.target.value)}
              // onBlur={console.log('Product Price:', productPrice)}
              value={productPrice}

            />
          </Box>

          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, maxwidth: '500px', minWidth: '300px' } }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Description" variant="outlined"
              onChange={(e) => setProductDescription(e.target.value)}
              // onBlur={console.log('Product Description:', productDescription)}
              value={productDescription}
            />
          </Box>

          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, maxwidth: '500px', minWidth: '300px' } }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Stock" variant="outlined"
              onChange={(e) => setProductStock(e.target.value)}
              // onBlur={console.log('Product Stock:', productStock)}
              value={productStock}
            />
          </Box>

          <FormGroup className="checkBoxGroup">
            <FormControlLabel
              className="checkBox"
              control={
                <Checkbox
                  name="L"
                  onChange={handleCheckboxChange}
                  checked={selectedSizes.includes("L")}
                />
              }
              label="L"
            />
            <FormControlLabel
              className="checkBox"
              control={
                <Checkbox
                  name="XL"
                  onChange={handleCheckboxChange}
                  checked={selectedSizes.includes("XL")}
                />
              }
              label="XL"
            />
            <FormControlLabel
              className="checkBox"
              control={
                <Checkbox
                  name="2XL"
                  onChange={handleCheckboxChange}
                  checked={selectedSizes.includes("2XL")}
                />
              }
              label="2XL"
            />
            <FormControlLabel
              className="checkBox"
              control={
                <Checkbox
                  name="3XL"
                  onChange={handleCheckboxChange}
                  checked={selectedSizes.includes("3XL")}
                />
              }
              label="3XL"
            />
          </FormGroup>

          <Box className="selectCategoryBox">
            <FormControl className="selectCategoryBox" >
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productCategory}
                label="Category"
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <MenuItem value="oversize">OVERSIZE</MenuItem>
                <MenuItem value="sweets">SWEETS</MenuItem>
                <MenuItem value="hoddies">HODDIES</MenuItem>
                <MenuItem value="baggies">BAGGIES</MenuItem>
                <MenuItem value="bags">BAGS</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* {console.log(productCategory)} */}

        </div>

        <button type="submit" className="listBtn" onClick={handleListing} >List Product</button>
        <div>
          {successListing && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Here is a gentle confirmation that your action was successful.
          </Alert>}
        </div>
      </div>

      <div className="listedProductContainer">
        <h2 style={{ marginBottom: 40 }}> Listed Products</h2>
        <div className="tableContainer">
          <table className="listedProductTable">
            <thead>
              <tr className="columeHeading">
                <th >Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listedItem.map((product, index) => (
                <tr key={index} className="columeData">
                  <td>
                    <img
                      value={product.images[0]}
                      src={product.images[0]}
                      // style={{ width: 100, height: 100, marginTop: 20 }}
                      onChange={(e) => handleEditProduct(index, 'images', e.target.value)}
                      
                    />
                  </td>
                  <td>
                    <textarea
                      className="input"
                      type="text"
                      value={product.productName}
                      onChange={(e) => handleEditProduct(index, 'productName', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      type="number"
                      value={product.productPrice}
                      onChange={(e) => handleEditProduct(index, 'productPrice', e.target.value)}
                    />
                  </td>
                  <td>
                    <textarea
                      className="input"
                      type="text"
                      value={product.productDescription}
                      onChange={(e) => handleEditProduct(index, 'productDescription', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      type="text"
                      value={product.productCategory}
                      onChange={(e) => handleEditProduct(index, 'productCategory', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      type="text"
                      value={product.productStock}
                      onChange={(e) => handleEditProduct(index, 'productStock', e.target.value)}
                    />
                  </td>
                  <td>
                    <GoTrash className="removeBtn" onClick={() => { handleRemove(product._id) }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )

}

export default profile

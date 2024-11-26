import { useState } from 'react';
import './ProductPopUp.css'

function ProductPopUp({ setPopUp, addToCart, product }) {
    console.log(product);
    const [mainImage, setMainImage] = useState(product.images[0]);
    const [sizeList,setsizeList] = useState("")

    return (
        <div className="popUpMainContainer">
            <div className="productPopUpContainer">
                <div className='cancleIcon' onClick={() => { setPopUp(false) }}>X</div>
                <div className="imgConatiner">
                    <div className="imgSemiConatiner">
                        <img src={mainImage} alt={product.productName} className='img' />
                    </div>
                    <div className="moreImagesContainer">
                        {product.images.map((image) =>
                            <div className="moreImage">
                                <img src={image} className='img' alt="" onClick={() => { setMainImage(image) }} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="contentContainer">
                    <div className="contentSemiContainer">
                        <p className='productHeading'>{product.productName}</p>
                        <p className="description">
                            {product.productDescription}
                        </p>
                        <span onClick={()=>{setsizeList("L")}} className={`${sizeList == "L" ? "userSelection":""} ${!product.selectedSizes.includes("L") ? "disabled" : ""} sizes`}>L</span>
                        <span onClick={()=>{setsizeList("XL")}} className={`${sizeList == "XL" ? "userSelection":""} ${!product.selectedSizes.includes("XL") ? "disabled" : ""} sizes`}>XL</span>
                        <span onClick={()=>{setsizeList("2XL")}} className={`${sizeList == "2XL" ? "userSelection":""} ${!product.selectedSizes.includes("2XL") ? "disabled" : ""} sizes`}>2XL</span>
                        <span onClick={()=>{setsizeList("3XL")}} className={`${sizeList == "3XL" ? "userSelection":""} ${!product.selectedSizes.includes("3XL") ? "disabled" : ""} sizes`}>3XL</span>
                        <p className="price">
                            RS. {product.productPrice}
                        </p>
                        <div className="addToCartBtn" onClick={(e) => addToCart(product, e, sizeList)}>ADD TO CART</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPopUp;
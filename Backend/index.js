const express = require('express');
const database = require('./db/user-db');
const registerRoute = require('./routes/user-register-route');
const app = express();
const cors = require('cors');
const logiRouter = require('./routes/user-login-route');
const cookieparser = require('cookie-parser');
const productRouter = require('./routes/product-route');
const displayItemRouter = require('./routes/displayItems-route');
const orderRouter = require('./routes/order-route');
const logoutRouter = require('./routes/logout-router');
const contactRouter = require('./routes/contact-router');

//middleware
app.use(cors({origin:"https://tanked-up.onrender.com", credentials:true, methods:['GET','POST','PUT','DELETE'] })); //CORS allocation
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());


//routes
app.use('/register', registerRoute );
app.use('/login' , logiRouter);
app.use('/productDetails' , productRouter);
app.use('/displayItems' , displayItemRouter);
app.use('/placeOrder' , orderRouter);
app.use('/logout' , logoutRouter );
app.use('/contact', contactRouter);
app.get("/" , (req,res) => {
    res.send("Hello World")
})



app.listen(8000 , () =>{
    database();
    console.log("server created successfully");
})
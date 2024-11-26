const userModel = require("../models/userModel");
const { sendVerificationCode } = require("../utility/codeGenerator");
const {setUser, getUser} = require ('../utility/auth');

const handleLogin = async (req, res) => {
    try {

        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json('User Not Found');
        }
        const code = await sendVerificationCode(email);
        res.json(code);
        console.log(code);


    } catch (error) {
        console.log(error);

    }
}


//handle token

const handleToken = async (req,res) => {
    console.log(req.body);
    const {email} = req.body;
    const user = await userModel.findOne({email});
    console.log(user);
    const jwtToken = setUser(user); // it will return token
    console.log(jwtToken);
    
    res.cookie('AccessToken' , jwtToken , {
            httpOnly: true,  // Makes the cookie accessible only by the web server
            secure: true, // Set to true if using HTTPS
            maxAge: 24 * 60 * 60 * 1000 ,// Cookie expiry time (1 day)
            sameSite: 'None'

    }).json('cookie set')
    
}


//token Verification

const verifyUser = async(req,res) => {
    const {AccessToken} = req.cookies;
    console.log(AccessToken);
    if (!AccessToken) {
       return res.json('Not LoggedIn')
    }
    else{
        const user = getUser(AccessToken);
        if(!user){
            return res.json('Not LoggedIn')    
        }
        console.log(user);
        try {
            const validateUser = await userModel.findOne({_id:user._id});
            console.log(validateUser);
    
            if (validateUser.isAdmin==true) {
                return res.json('Welcome Admin')
            }
            if(validateUser){
                return res.json('Valid User')
            }
        } catch (error) {
            console.log(error);
            
        }
       
    }
}

module.exports = { handleLogin , handleToken , verifyUser};
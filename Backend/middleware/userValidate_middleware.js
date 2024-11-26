
const validateUser = async(req,res,next) => {
    const {AccessToken} = req.cookies;
    console.log(AccessToken);
    if (!AccessToken) {
        res.json('Not LoggedIn')
    }
    else{
        const user = getUser(AccessToken);
        if(!user){
            res.json('Not LoggedIn')    
        }
        console.log(user);
        try {
            const validateUser = await userModel.findOne({_id:user._id});
            console.log(validateUser);
            if(validateUser){
                req.user = validateUser;
                next();

            }
        } catch (error) {
            console.log(error);
            
        }
       
    }
}

module.exports = validateUser;
const orderModel = require('../models/userProfileModel')
const { getUser } = require('../utility/auth');

const handlePreviousOrderDisplay = async (req, res) => {
    const token = req.cookies.AccessToken;
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    const decoded = getUser(token);
    const useremail = decoded.email;
    const response = await orderModel.find({ userEmail: useremail });
    console.log("previousOrder:", response);

    res.json(response);
}

module.exports = handlePreviousOrderDisplay;
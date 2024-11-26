const userModel = require('../models/userModel')


const handleRegister = async (req, res) => {
    const { email, username , isAdmin } = req.body;

    // Validate input
    if (!email || !username) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = new userModel({
            email,
            username,
            isAdmin: email === 'sundarghodadara@gmail.com', // Set isAdmin based on the email
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error("Registration error:", error); // Log the error for debugging
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};


module.exports ={ 
    handleRegister
}
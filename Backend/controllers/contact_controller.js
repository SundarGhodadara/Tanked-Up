const contactModel = require('../models/contactModel');


const handleContact = async (req, res) => {
    const { email, name , message } = req.body;

    // Validate input
    if (!email || !name || !message) {
        return res.status(400).json({ message: 'Email, Name and Message are required' });
    }

    try {
        const contact = new contactModel({
            email,
            name,
            message
        });

        await contact.save();
        res.status(201).json({ message: 'message send successfully', contact });
        
    } catch (error) {
        console.error("message sending error:", error); // Log the error for debugging
        res.status(500).json({ message: 'Error to sending message', error: error.message });
    }
};


module.exports ={ 
    handleContact
}
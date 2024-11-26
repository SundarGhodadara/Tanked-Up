const handleLogout = (req, res) => {
    // Clear the JWT token cookie
    res.clearCookie('AccessToken', {
        httpOnly: true, // Match the same attributes used when setting the cookie
        secure: true, // Set to true if using HTTPS
        sameSite: 'None' // Match the same attribute
    });

    // Optional: Destroy session if applicable
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Failed to destroy session' });
            }
            return res.status(200).json({ message: 'Logged out successfully' });
        });
    } else {
        return res.status(200).json({ message: 'Logged out successfully' });
    }
};

module.exports = { handleLogout };

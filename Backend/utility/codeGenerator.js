const nodemailer = require('nodemailer');

// Function to generate a 6-digit random code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit code
}

// Function to send the verification code via email
async function sendVerificationCode(userEmail) {
  // Generate a 6-digit code
  const verificationCode = generateVerificationCode();

  // Create a transporter object using the SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your SMTP service provider
    auth: {
      user: 'shriishprajapati777@gmail.com', // Your email address
      pass: 'rvlydrziouofaper', // Your email password (consider using environment variables or OAuth for security)
    },
  });

  // Set up email data with unicode symbols
  const mailOptions = {
    from: '"TANKED UP" <shriishprajapati777@gmail.com>', // Sender address
    to: userEmail, // Recipient's email address
    subject: 'Your TANKED UP Verification Code', // Subject line
    text: `Your verification code is: ${verificationCode}`, // Plain text body
    html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`, // HTML body
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification code sent: %s', info.messageId);
    return verificationCode; // Return the code for further use (like storing in the database)
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw error; // Handle error appropriately
  }
}

module.exports = {
  sendVerificationCode
}
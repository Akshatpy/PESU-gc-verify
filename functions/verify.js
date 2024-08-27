const axios = require('axios');
exports.handler = async function(event, context) {
  const { username, password } = JSON.parse(event.body);
  try {
    const response = await axios.post('https://pesu-auth.onrender.com/authenticate', {
      username: username,
      password: password,
      profile: true
    });
    if (response.data.status && response.data.message === "Login successful.") {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "PRN verified successfully!",
          inviteLink: process.env.WHATSAPP_INVITE_LINK 
        })
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Failed to verify PRN. Please check the details." })
      };
    }
  } catch (error) {
    console.error("Error during verification:", error.message, error.response?.data);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occurred while verifying the PRN. Please try again later." })
    };
  }
};

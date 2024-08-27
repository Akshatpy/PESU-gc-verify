const axios = require('axios');

// Define the API handler
exports.handler = async function(event, context) {
  // Parse the incoming request body
  const { username, password } = JSON.parse(event.body);

  try {
    // Make a POST request to the PESU authentication API
    const response = await axios.post('https://pesu-auth.onrender.com/authenticate', {
      username: username,
      password: password,
      profile: true
    });

    // Check the response from PESU API
    if (response.data.status && response.data.message === "Login successful.") {
      // If login is successful, return the WhatsApp invite link
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "SRN verified successfully!",
          inviteLink: "https://chat.whatsapp.com/invite/YourInviteLink" // Replace with your actual invite link
        })
      };
    } else {
      // If login fails, return an error message
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Failed to verify SRN. Please check the details." })
      };
    }
  } catch (error) {
    console.error("Error during verification:", error.message, error.response?.data);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occurred while verifying the SRN. Please try again later." })
    };
  }
};

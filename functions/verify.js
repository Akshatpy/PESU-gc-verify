exports.handler = async function(event, context) {
  // Your verification logic goes here
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());

// Serve the HTML file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/verify', async (req, res) => {
    const { username, password } = req.body;

    try {
        const response = await axios.post('https://pesu-auth.onrender.com/authenticate', {
            username: username,
            password: password,
            profile: true
        });

        console.log("Response from PESU API:", response.data);

        if (response.data.status && response.data.message === "Login successful.") {
            res.json({ 
                message: "SRN verified successfully! Here is your invite link: https://chat.whatsapp.com/invite/YourInviteLink",
                profile: response.data.profile // Optional: Include profile data in response
            });
        } else {
            res.json({ message: "Failed to verify SRN. Please check the details." });
        }
    } catch (error) {
        console.error("Error during verification:", error.message, error.response?.data);
        res.json({ message: "An error occurred while verifying the SRN. Please try again later." });
    }
});




app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Verification API is working!' })
  };
};
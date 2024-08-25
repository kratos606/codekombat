const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('./models/users');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs'); // Import the file system module to read SSL certificates
const https = require('https'); // Import HTTPS module
const http = require('http'); // Import HTTP module for redirection
require('dotenv').config();

// Load SSL certificates
const privateKey = fs.readFileSync(path.resolve(__dirname, 'ssl', 'privateKey.key'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, 'ssl', 'certificate.crt'), 'utf8');
const ca = fs.readFileSync(path.resolve(__dirname, 'ssl', 'ca_bundle.crt'), 'utf8');

// Define the SSL credentials
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

// Function to check if Docker is running
function checkDockerRunning(callback) {
    exec('docker info', (error, stdout, stderr) => {
        if (error) {
            console.error('Docker is not running or not installed:', stderr);
            callback(false);
        } else {
            console.log('Docker is running');
            callback(true);
        }
    });
}

// Function to build Docker image
function buildDockerImage() {
    exec('docker build -f Dockerfile.python -t python-runner .', (error, stdout, stderr) => {
        if (error) {
            console.error('Error building Docker image:', stderr);
        } else {
            console.log('Docker image built successfully:', stdout);
        }
    });
}

// Check if Docker is running and build the Docker image
checkDockerRunning((isRunning) => {
    if (isRunning) {
        buildDockerImage();
    }
});

// Initialize the app and set options
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_SECRET_KEY,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) return console.error(err);
        // Create admin user if it doesn't exist
        User.findOne({
            email: process.env.ADMIN_EMAIL
        }, async (err, user) => {
            if (err) return console.error(err);
            if (!user) {
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
                const admin = new User({
                    username: process.env.ADMIN_USERNAME,
                    email: process.env.ADMIN_EMAIL,
                    password: password,
                    isAdmin: true
                });
                admin.save();
            }
        });
        console.log('Connected to Mongoose');
    }
);

// Routes
const auth = require('./routers/auth');
app.use('/api/auth', auth);
const user = require('./routers/user');
app.use('/api/user', user);
const game = require('./routers/game');
app.use('/api/game', game);
const mail = require('./routers/mail');
app.use('/api/mail', mail);
const solution = require('./routers/solution');
app.use('/api/solution', solution);
app.use('/certificate', express.static(__dirname + '/assets/certificates'));
app.use(express.static('client-vite/dist'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client-vite', 'dist', 'index.html'));
});

// Create an HTTP server to redirect all HTTP traffic to HTTPS
const httpApp = express();
httpApp.use((req, res, next) => {
    if (req.secure) {
        return next();
    }
    res.redirect(`https://${req.hostname}${req.url}`);
});

http.createServer(httpApp).listen(80, () => {
    console.log('HTTP Server running on port 80 and redirecting to HTTPS');
});

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
    console.log('HTTPS Server is running on port 443');
});

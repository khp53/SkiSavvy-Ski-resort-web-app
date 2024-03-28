// db_config.js

const mongoose = require('mongoose');

// Retrieve MongoDB connection string from environment variables
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Event handlers for MongoDB connection
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB disconnected due to application termination');
        process.exit(0);
    });
});

module.exports = mongoose;

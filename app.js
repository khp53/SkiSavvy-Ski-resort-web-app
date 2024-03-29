// Load environment variables
require('dotenv').config();
const mongoose = require('./config/db_config');
const express = require('express');
const path = require('path');
const routes = require('./routes/data_routes');
const app = express();
const port = 4000;

// Enable CORS middleware
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.use(express.static(path.join(__dirname, 'view/build')));
app.use(express.json());

app.use('/api', routes);

app.get('/', async (req, res) => {
	res.sendFile(path.join(__dirname, 'view/build', 'index.html'));
});

app.listen(port, () => {
	console.log('Server running at http://localhost:4000');
});

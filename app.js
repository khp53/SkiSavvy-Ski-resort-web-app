const express = require('express');
const path = require('path');
const routes = require('./routes/data_routes');
const app = express();
const port = 4000;


app.use(express.static(path.join(__dirname, 'view/build')));
app.use(express.json());

app.use('/api', routes);

app.get('/*', async (req, res) => {
	res.sendFile(path.join(__dirname, 'view/build', 'index.html'));
});

app.listen(port, () => {
	console.log('Server running at http://localhost:4000');
});

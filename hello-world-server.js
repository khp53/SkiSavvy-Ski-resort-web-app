const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, 'view/build')));

app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname, 'view/build', 'index.html'));
});

app.listen(port, () => {
	 console.log('Server running at http://localhost:4000');
	});

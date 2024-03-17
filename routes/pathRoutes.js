const express = require('express');
const router = express.Router();
const pathController = require('../controller/pathController');

router.post('/path', pathController.createPath);

module.exports = router;

const express = require('express');
const router = express.Router();
const pathController = require('../controller/path_controller');

router.post('/path', pathController.createPath);

module.exports = router;

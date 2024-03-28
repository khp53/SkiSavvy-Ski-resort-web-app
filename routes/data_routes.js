const express = require('express');
const router = express.Router();
const PathController = require('../controller/path_controller');

const pathController = new PathController();

router.post('/path', pathController.createPath);

module.exports = router;

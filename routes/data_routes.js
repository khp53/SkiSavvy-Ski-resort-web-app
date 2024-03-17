const express = require('express');
const router = express.Router();
const pathController = require('../controller/path_controller');
const skiResortController = require('../controller/ski_resort_controller');

router.post('/path', pathController.createPath);
router.get('/resort', skiResortController.getSkiResort);

module.exports = router;

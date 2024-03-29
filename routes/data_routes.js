const express = require('express');
const router = express.Router();
const PathController = require('../controller/path_controller');
const SkiResortController = require('../controller/ski_resort_controller');

const pathController = new PathController();
const resortController = new SkiResortController();

router.post('/path', pathController.createPath);
router.get('/resort', resortController.getTheFirstSkiResort);
router.get('/path/all', pathController.getAllPaths);

module.exports = router;

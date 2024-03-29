const express = require('express');
const PathController = require('../controller/pathController');
const SkiResortController = require('../controller/skiResortController');

class RouterManager {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        const pathController = new PathController();
        const resortController = new SkiResortController();

        this.router.post('/path', pathController.createPath.bind(pathController));
        this.router.get('/resort', resortController.getTheFirstSkiResort.bind(resortController));
        this.router.get('/path/all', pathController.getAllPaths.bind(pathController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = RouterManager;

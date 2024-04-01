const express = require('express');
const CalculateRouteController = require('../controller/calculateRouteController');
const SkiResortController = require('../controller/skiResortController');

class RouterManager {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        const crController = new CalculateRouteController();
        const resortController = new SkiResortController();

        this.router.post('/route', crController.insertRoute.bind(crController));
        this.router.get('/resort', resortController.getTheFirstSkiResort.bind(resortController));
        this.router.get('/route/all', crController.getAllRoutes.bind(crController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = RouterManager;

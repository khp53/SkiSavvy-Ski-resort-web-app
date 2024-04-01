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

        this.router.get('/resort', resortController.getTheFirstSkiResort.bind(resortController));
        this.router.post('/route', crController.insertRoute.bind(crController));
        this.router.get('/route/all', crController.getAllRoutes.bind(crController));
        this.router.get('/route/find/new', crController.getFirstRoute.bind(crController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = RouterManager;

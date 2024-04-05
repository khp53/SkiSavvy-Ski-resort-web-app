const express = require('express');
const CalculateRouteController = require('../controller/calculateRouteController');
const SkiResortController = require('../controller/skiResortController');
const RouteSelectionController = require('../controller/routeSelectionController');

class RouterManager {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        const crController = new CalculateRouteController();
        const resortController = new SkiResortController();
        const routeSelectionController = new RouteSelectionController();

        this.router.get('/resort', resortController.getTheFirstSkiResort.bind(resortController));
        this.router.post('/selection', routeSelectionController.insertSelection.bind(routeSelectionController));
        this.router.get('/selection/all', routeSelectionController.getAllSelection.bind(routeSelectionController));
        this.router.get('/selection/find/new', routeSelectionController.getFirstSelection.bind(routeSelectionController));
        this.router.get('/route/calculate/all', (req, res, next) => {
            req.resortController = resortController;
            req.routeSelectionController = routeSelectionController;
            next();
        }, crController.calculateAllRoutes.bind(crController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = RouterManager;

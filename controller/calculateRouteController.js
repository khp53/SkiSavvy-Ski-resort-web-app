const RouteSelection = require('../model/routeSelectionModel');

class CRController {
    constructor() {
        this.routeSelection = new RouteSelection();
        this.SelectedRoute = this.routeSelection.getRouteSelectionModel();
    }

    // get the first ski resort by using skiResortController getTheFirstSkiResort method
    // and using the getFirstRoute method to get the first route
    // calculate all possible paths between the first ski resort and the first route
    // and return all possible paths
    async calculateAllRoutes(req, res) {
        try {
            const skiResortController = req.resortController;
            const firstSkiResort = await skiResortController.getTheFirstSkiResort.bind(skiResortController);
            const selectedRoute = await this.SelectedRoute.findOne();
            const routes = await this.calculatePaths(firstSkiResort, selectedRoute.start, selectedRoute.end, selectedRoute.profile);
            return res.status(200).json({ statusCode: 200, message: 'All paths calculated successfully', data: routes });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
        }
    }

    // calculate all possible paths between the first ski resort and the first route
    async calculateRoutes(skiResort, start, end, profile) {
        const routes = [];
        // calculate all possible paths
        // between the first ski resort and the first route
        return routes;
    }
}

module.exports = CRController;


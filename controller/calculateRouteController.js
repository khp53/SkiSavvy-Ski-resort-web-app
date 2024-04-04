class CRController {
    constructor() {
    }

    // get the first ski resort by using skiResortController getTheFirstSkiResort method
    // and using the getFirstRoute method to get the first route
    // calculate all possible paths between the first ski resort and the first route
    // and return all possible paths
    async calculateAllRoutes(req, res) {
        try {
            const skiResortController = req.resortController;
            const firstSkiResort = await skiResortController.getTheFirstSkiResort.bind(skiResortController);
            const routeSelectionController = req.routeSelectionController;
            const selectedRoute = await routeSelectionController.getFirstSelection.bind(routeSelectionController);
            const routes = await this.calculateRoutes(firstSkiResort, selectedRoute.start, selectedRoute.end, selectedRoute.profile);
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

// adjust slope speed to 20 km/h
// if user does not select a difficulty level dont incorporate it in the calculation.
// filter out only one route based on user filter.
// let user select another route if they want to.
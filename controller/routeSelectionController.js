const RouteSelection = require('../model/routeSelectionModel');

class RouteSelectionController {
    constructor() {
        this.routeSelection = new RouteSelection();
        this.SelectedRoute = this.routeSelection.getRouteSelectionModel();
    }

    async insertSelection(req, res) {
        if (!req.body || !req.body.start || !req.body.end || !req.body.profile ||
            !req.body.start.id || !req.body.start.title || !req.body.start.latLng ||
            !req.body.end.id || !req.body.end.title || !req.body.end.latLng) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid or incomplete request body', data: null });
        }

        const { start, end, profile } = req.body;

        if (typeof start.id !== 'number' || typeof start.title !== 'string' || !Array.isArray(start.latLng) || start.latLng.length !== 2 ||
            typeof end.id !== 'number' || typeof end.title !== 'string' || !Array.isArray(end.latLng) || end.latLng.length !== 2 ||
            !Array.isArray(profile.difficulty)) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid data format in request body', data: null });
        }

        const data = new this.SelectedRoute({
            start: {
                id: start.id,
                title: start.title,
                latLng: start.latLng
            },
            end: {
                id: end.id,
                title: end.title,
                latLng: end.latLng
            },
            profile: {
                difficulty: profile.difficulty
            }
        });

        try {
            await data.save();
            return res.status(201).json({ statusCode: 201, message: 'Points selected successfully', data: data });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
        }
    }


    async getAllSelection(req, res) {
        try {
            const selections = await this.SelectedRoute.find();
            return res.status(200).json({ statusCode: 200, message: 'All points retrieved successfully', data: selections });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
        }
    }

    async getFirstSelection(req, res) {
        try {
            const selections = await this.SelectedRoute.find(); // if last one change this later
            const selection = selections[selections.length - 1]; // last one
            //return res.status(200).json({ statusCode: 200, message: 'Points retrieved successfully', data: selection });
            return selection;
        } catch (error) {
            console.error(error);
            //return res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
            return null;
        }
    }
}

module.exports = RouteSelectionController;


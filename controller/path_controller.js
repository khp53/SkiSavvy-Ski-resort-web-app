// pathController.js

const Route = require('../model/route_model');

class PathController {
    constructor() {
        this.route = new Route();
        this.Path = this.route.getPathModel();
        this.createPath = this.createPath.bind(this);
    }

    async createPath(req, res) {
        if (req.body === null || req.body.endPoint === null || req.body.startPoint === null) {
            return res.status(400).json({ statusCode: 400, message: 'Missing startPoint or endPoint in request body', data: null });
        }

        const data = new this.Path({
            startPoint: req.body.startPoint,
            endPoint: req.body.endPoint
        });

        try {
            await data.save();
            return res.status(201).json({ statusCode: 201, message: 'Path selected successfully', data: data });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
        }
    }
}

module.exports = PathController;

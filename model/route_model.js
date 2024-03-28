// ../model/Route.js
const mongoose = require('mongoose');

class Route {
    constructor() {
        this.initializeSchema();
        this.initializeModel();
    }

    initializeSchema() {
        this.pathSchema = new mongoose.Schema({
            startPoint: {
                type: String,
                required: true
            },
            endPoint: {
                type: String,
                required: true
            }
        });
    }

    initializeModel() {
        this.Path = mongoose.model('Paths', this.pathSchema);
    }

    getPathModel() {
        return this.Path;
    }
}

module.exports = Route;

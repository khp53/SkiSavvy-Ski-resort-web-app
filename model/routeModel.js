// ../model/Route.js
const mongoose = require('mongoose');

class Route {
    constructor() {
        this.initializeSchema();
        this.initializeModel();
    }

    initializeSchema() {
        this.pathSchema = new mongoose.Schema({
            start: {
                id: {
                    type: Number,
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                latLng: [{
                    type: Number,
                    required: true
                }]
            },
            end: {
                id: {
                    type: Number,
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                latLng: [{
                    type: Number,
                    required: true
                }]
            },
            profile: {
                difficulty: {
                    type: String,
                    required: true
                }
            }
        });
    }

    initializeModel() {
        this.Route = mongoose.model('routes', this.pathSchema);
    }

    getRouteModel() {
        return this.Route;
    }
}

module.exports = Route;


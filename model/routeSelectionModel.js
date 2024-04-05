const mongoose = require('mongoose');

class RouteSelection {
    constructor() {
        this.initializeSchema();
        this.initializeModel();
    }

    initializeSchema() {
        this.selectionSchema = new mongoose.Schema({
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
                difficulty: [{
                    type: String,
                    required: true
                }]
            }
        });
    }

    initializeModel() {
        this.RouteSelection = mongoose.model('selections', this.selectionSchema);
    }

    getRouteSelectionModel() {
        return this.RouteSelection;
    }
}

module.exports = RouteSelection;


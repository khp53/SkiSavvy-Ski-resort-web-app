const mongoose = require('mongoose');

class SkiResort {

    constructor() {
        this.initializeSchemas();
        this.initializeModel();
    }

    initializeNodeSchema() {
        this.nodeSchema = new mongoose.Schema({
            id: { type: Number, required: true },
            name: { type: String, required: true },
            x: { type: Number, required: true },
            y: { type: Number, required: true }
        });
    }

    initializeEdgeSchema() {
        this.edgeSchema = new mongoose.Schema({
            source: { type: Number, required: true },
            target: { type: Number, required: true },
            type: { type: String, required: true },
            difficulty: { type: String, required: true }
        });
    }

    initializeSkiResortSchema() {
        this.skiResortSchema = new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true },
            nodes: [this.nodeSchema],
            edges: [this.edgeSchema]
        });
    }

    initializeModel() {
        this.SkiResort = mongoose.model('skiresorts', this.skiResortSchema);
    }

    initializeSchemas() {
        this.initializeNodeSchema();
        this.initializeEdgeSchema();
        this.initializeSkiResortSchema();
    }

    getResortModel() {
        return this.SkiResort;
    }
}

module.exports = SkiResort;

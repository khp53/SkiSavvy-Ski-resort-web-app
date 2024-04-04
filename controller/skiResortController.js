const Resort = require('../model/skiResortModel');

class SkiResortController {
    constructor() {
        this.skiResort = new Resort();
        this.SkiResort = this.skiResort.getResortModel();
        this.getTheFirstSkiResort = this.getTheFirstSkiResort.bind(this);
        this.getFirstSkiResortData = this.getFirstSkiResortData.bind(this);
        this.getAllSkiResorts = this.getAllSkiResorts.bind(this);
        this.getSkiResortById = this.getSkiResortById.bind(this);
    }

    async getTheFirstSkiResort(req, res) {
        try {
            const skiResort = await this.SkiResort.findOne();
            return res.status(200).json({ statusCode: 200, message: 'Ski resort retrieved successfully', data: skiResort });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
        }
    }

    async getFirstSkiResortData() {
        try {
            const skiResort = await this.SkiResort.findOne();
            return skiResort;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getAllSkiResorts(req, res) {
        try {
            // Retrieve all SkiResort documents
            const skiResorts = await this.SkiResort.find();
            return res.status(200).json({ statusCode: 200, message: 'Ski resort retrived successfully', data: skiResorts });
        } catch (error) {
            console.error("Error fetching ski resorts:", error);
            return res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
        }
    }

    async getSkiResortById(req, res, id) {
        try {
            // Retrieve a SkiResort document by ID
            const skiResort = await this.SkiResort.findById(id);
            if (!skiResort) {
                return res.status(404).json({ statusCode: 404, message: 'Ski resort not found', data: null });
            }
            return res.status(200).json({ statusCode: 200, message: 'Ski resort retrieved successfully', data: skiResort });
        } catch (error) {
            console.error("Error fetching ski resort by ID:", error);
            return res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
        }
    }
}

module.exports = SkiResortController;

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
}

module.exports = SkiResortController;

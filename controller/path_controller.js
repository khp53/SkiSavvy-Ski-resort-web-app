const Path = require('../model/route_model');
const connectDB = require('../config/db_config');

exports.createPath = async (req, res) => {
    if (!req.body || !req.body.startPoint) {
        return res.status(400).json({ statusCode: 400, message: 'Missing startPoint in request body', data: null });
    } else if (!req.body || !req.body.endPoint) {
        return res.status(400).json({ statusCode: 400, message: 'Missing endPoint in request body', data: null });
    } else {
        const data = new Path(req.body.startPoint, req.body.endPoint);
        const db = await connectDB();
        await db.collection('Paths').insertOne(data);
        return res.status(201).json({ statusCode: 201, message: 'Path selected successfully', data: data });
    }
};

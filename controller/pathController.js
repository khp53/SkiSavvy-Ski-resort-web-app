const Path = require('../model/pathModel');

exports.createPath = (req, res) => {
    if (!req.body || !req.body.startPoint) {
        return res.status(400).json({ statusCode: 400, message: 'Missing startPoint in request body', data: null });
    } else if (!req.body || !req.body.endPoint) {
        return res.status(400).json({ statusCode: 400, message: 'Missing endPoint in request body', data: null });
    } else {
        const data = new Path(req.body.startPoint, req.body.endPoint);
        return res.status(201).json({ statusCode: 201, message: 'Path selected successfully', data: data });
    }
};

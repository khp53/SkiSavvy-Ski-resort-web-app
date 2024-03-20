const Resort = require('../model/ski_resort_model');
const connectDB = require('../config/db_config');

exports.getSkiResort = async (req, res) => {
    const db = await connectDB();
    const data = await db.collection('SkiResort').find({}).toArray();
    return res.status(200).json({ statusCode: 200, message: 'Ski resort data fetched successfully', data: data[0] });
};
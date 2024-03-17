const { MongoClient } = require('mongodb');
let _db;

async function connectDB() {
    const uri = "mongodb+srv://mkarimulh:H3eAOOhImlbKtRWL@cluster0.o4wrshh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri);

    try {
        await client.connect();
        _db = await client.db("SkiSavvy")
        _db.command({ serverStatus: {} }, function (err, data) {
            if (err) {
                console.log("Database is not connected");
            } else {
                console.log("Database is connected");
            }
        });
        return _db;
    } catch (e) {
        console.error(e);
    }
}

connectDB().catch(console.error);
module.exports = connectDB;

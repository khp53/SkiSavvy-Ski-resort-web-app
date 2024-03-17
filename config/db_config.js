const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://mkarimulh:H3eAOOhImlbKtRWL@cluster0.o4wrshh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri);

    try {
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        // Perform actions on the collection object
        console.log("Connected successfully to server");
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

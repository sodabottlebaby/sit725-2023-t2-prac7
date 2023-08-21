const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://suthiri:8bfxVMUH1kAqkGW6@cluster0.2giefiw.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

client.connect();

module.exports = client;

let express = require('express');
var cors = require('cors')

let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://suthiri:8bfxVMUH1kAqkGW6@cluster0.2giefiw.mongodb.net/?retryWrites=true&w=majority";
app.use(cors())
let port = process.env.PORT || 3000;
let collection; 

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function runDBConnection() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    collection = client.db.collection('Cat');
    console.log(collection);
  } catch(ex) {
    console.error(ex);
  } 
}

app.get('/', (req, res)=>{
    res.render('index.html');
});

console.log('test');

app.post('/api/cat', (req,res)=>{
    let cat = req.body;
    postCat(cat, (err, result) => {
        if (!err) {
            res.json({statusCode: 201, data: result, message:'Cat created successfully!'});
        }
    });
});

function postCat(cat,callback) {
    collection.insertOne(cat,callback);
}

app.listen(port, ()=>{
    //this is the logic that will be fired upon server start
    console.log('Server started on port: ' + port);
    runDBConnection();
});


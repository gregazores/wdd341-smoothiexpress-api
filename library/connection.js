//import dotenv for our env file for our database connection creds
const dotenv = require('dotenv');
dotenv.config();
//export MongoClient, and that’s what we’ll use to connect to a MongoDB database
const {MongoClient, ServerApiVersion} = require('mongodb');
const port = process.env.PORT || 8080;

let _db
// const uri = 'mongodb+srv://jeeveegreg:Xj1bx5bwdFGlFKnF@cluster0.y6f6qac.mongodb.net/ContactsDB?retryWrites=true&w=majority'
async function initDb(){
    if (_db) {
        console.log('Db is already initialized!');
        return
      }
    // create an instance of MongoClient.
    const client = new MongoClient(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 
    try {
        // Connect to the MongoDB cluster
        _db = await client.connect();
        const app = require('../server');
        app.listen(port, () => {
            console.log(`Running on port ${port}`)
        })
    } catch (e) {
        console.error(e);
    }
    // finally {
    //     await client.close();
    // }
}

function getDb() {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
}

module.exports = {initDb, getDb};

import mongodb from 'mongodb'
import dotenv from 'dotenv'
const dotenvconf = dotenv.config();

const MongoClient = mongodb.MongoClient;
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let instance = null;

async function getConnection(){
    if(instance == null){
        try {
            instance = await client.connect();
        } catch (err) {
            console.log(err.message);
            throw new Error('Problema al conectarse con mongo');
        }
    }
    return instance;
}

export default {getConnection};

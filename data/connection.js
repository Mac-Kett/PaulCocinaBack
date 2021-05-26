import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://admin:cDc77Pqkfs5kVKEW@cluster0.nml9c.mongodb.net/PaulCocina_DB?retryWrites=true&w=majority";

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

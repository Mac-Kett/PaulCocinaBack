import connection from './connection.js';
import mongodb from 'mongodb';
let objectId = mongodb.ObjectId;


async function getIngredientes(){
    const clientmongo = await connection.getConnection();
    const ingredientes = await clientmongo.db('PaulCocina_DB')
                    .collection('ingredientes')
                    .find()
                    .toArray();
    return ingredientes;
}

async function getIngrediente(id){
    const clientmongo = await connection.getConnection();
    const ingrediente = await clientmongo.db('PaulCocina_DB')
                    .collection('ingredientes')
                    .findOne({_id: new objectId(id)});
    return ingrediente;
}

async function addIngrediente(ingrediente){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('PaulCocina_DB')
                    .collection('ingredientes')
                    .insertOne(ingrediente);
    return result;
}

async function updateIngrediente(ingrediente){
    const clientmongo = await connection.getConnection();
    const query = {_id: new objectId(ingrediente._id)};
    const newvalues = { $set:{
            name: ingrediente.name,
            desc: ingrediente.desc,
        }
    };

    const result = await clientmongo.db('PaulCocina_DB')
                    .collection('ingredientes')
                    .updateOne(query, newvalues);
    return result;
}

async function deleteIngrediente(id){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('PaulCocina_DB')
                    .collection('ingredientes')
                    .deleteOne({_id: new objectId(id)});
    return result;

}

export default {getIngredientes , getIngrediente, addIngrediente, updateIngrediente, deleteIngrediente};
import connection from './connection.js';
import mongodb from 'mongodb';
let objectId = mongodb.ObjectId;

async function getRecetas(){
    const clientmongo = await connection.getConnection();
    const recetas = await clientmongo.db('PaulCocina_DB')
                    .collection('recipes')
                    .find()
                    .toArray();
    return recetas;
}

async function getReceta(id){
    const clientmongo = await connection.getConnection();
    const receta = await clientmongo.db('PaulCocina_DB')
                    .collection('recipes')
                    .findOne({_id: new objectId(id)});
    return receta;
}
async function getRecetasByCategory(categoria) {
    const clientmongo = await connection.getConnection();
    const recetas = await clientmongo.db('PaulCocina_DB')
                    .collection('recipes')
                    .find({categoria : categoria}).toArray();
    return recetas;
}

async function addReceta(receta){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('PaulCocina_DB')
                    .collection('recipes')
                    .insertOne(receta);
    return result;
}

async function updateReceta(receta){
    const clientmongo = await connection.getConnection();
    const query = {_id: new objectId(receta._id)};
    const newvalues = { $set:{
            titulo: receta.titulo,
            descripcion: receta.descripcion,
            instrucciones:receta.instrucciones,
            foto:receta.foto,
            categoria:receta.categoria,
            ingredientes:receta.ingredientes,
             // no se si va asi!!!
        }
    };
    const result = await clientmongo.db('PaulCocina_DB')
                    .collection('recipes')
                    .updateOne(query, newvalues);
    return result;
}

async function deleteReceta(id){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('PaulCocina_DB')
                    .collection('recipes')
                    .deleteOne({_id: new objectId(id)});
    return result;

}

export default {getRecetas , getReceta,getRecetasByCategory, addReceta, updateReceta, deleteReceta};

import connection from './connection.js';
//import mongodb from 'mongodb';
//let objectId = mongodb.ObjectId;

//buscamos un ingrediente

async function getElementoBuscado(elemento){
   const clientmongo = await connection.getConnection();
    const recetas = await clientmongo.db('PaulCocina_DB')
                    .collection('recipes')
                    .find({"ingredientes": elemento})
                    .toArray();
    return recetas;
}


export default {getElementoBuscado};
import connection from './connection.js';


async function getElementoBuscado(elemento){
   const clientmongo = await connection.getConnection();
    const recetas = await clientmongo.db('PaulCocina_DB')
                    .collection('recipes')
                    .find ({
                        $or : [
                        {"titulo":{$regex: elemento, $options:"i"}},
                        {"ingredientes":{$regex: elemento, $options:"i"}}, 
                        ]
                    })
                    .toArray();
    return recetas;
}


export default {getElementoBuscado};
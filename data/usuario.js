import connection from './connection.js';
import mongodb from 'mongodb';
let objectId = mongodb.ObjectId;


async function getUsuarios(){
    const clientmongo = await connection.getConnection();
    const usuarios = await clientmongo.db('PaulCocina_DB')
                    .collection('users')
                    .find()
                    .toArray();
    return usuarios;
}

async function getUsuario(id){
    const clientmongo = await connection.getConnection();
    const usuario = await clientmongo.db('PaulCocina_DB')
                    .collection('users')
                    .findOne({_id: new objectId(id)});
    return usuario;
}

async function addUsuario(usuario){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('PaulCocina_DB')
                    .collection('users')
                    .insertOne(usuario);
    return result;
}

async function updateUsuario(usuario){
    const clientmongo = await connection.getConnection();
    const query = {_id: new objectId(usuario._id)};
    const newvalues = { $set:{
            name: usuario.name,
            desc: usuario.desc,
        }
    };

    const result = await clientmongo.db('PaulCocina_DB')
                    .collection('users')
                    .updateOne(query, newvalues);
    return result;
}

async function deleteUsuario(id){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('PaulCocina_DB')
                    .collection('users')
                    .deleteOne({_id: new objectId(id)});
    return result;

}

export default {getUsuarios , getUsuario, addUsuario, updateUsuario, deleteUsuario};

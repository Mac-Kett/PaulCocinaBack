import express from 'express';
const router = express.Router();
import joi from 'joi';
import connection from '../data/connection.js';
import mongodb from 'mongodb';
let objectId = mongodb.ObjectId;
/*
{
  nombre: '',
  apellido: '',
  direccion: '',
  altura: '',
  piso: '',
  codigoPostal: '',
  nombreTarjeta: '',
  numeroTarjeta: '',
  fechaExpiracion: '',
  nroCVV: '',
  localidad:'',
  provincia:'',
  pais:'',
  productos: [],
  total: 0,
  estado:'NUEVO'
}*/

//  /pedidos
router.get('/', async function(req, res, next) {
  const clientmongo = await connection.getConnection();
  const pedidos = await clientmongo.db('PaulCocina_DB')
                  .collection('pedidos')
                  .find()
                  .toArray();
  if(pedidos){    
    res.json(pedidos);
  } else {
    res.status(404).send('No hay pedidos');
  }
});

router.get('/:id', async (req,res)=>{
  const receta = await dataReceta.getReceta(req.params.id);
  if(receta){
      res.json(receta);
  } else {
      res.status(404).send('Receta no encontrada');
  }
});

router.post('/', async (req, res)=>{   
  const clientmongo = await connection.getConnection();

  /*const schema = joi.object({
    nombre: joi.string().min(5).required(),
    apellido: joi.string().min(5).required(),
    direccion: joi.string().min(5).required(),
    altura: joi.number(),
    piso: joi.number(),
    codigoPostal: joi.number(),
    nombreTarjeta: joi.string(),
  });
  const result = schema.validate(req.body);

  if(result.error){
      res.status(400).send(result.error.details[0].message);
  } else{*/
      let pedido = req.body;
      pedido = await clientmongo.db('PaulCocina_DB')
        .collection('pedidos')
        .insertOne(pedido);
      res.json(pedido.ops);
  //}    
});

// /recetas/id
router.put('/:id', async (req, res)=>{
  const schema = joi.object({
    titulo: joi.string().min(5),
    descripcion: joi.string().min(15),
    instrucciones:joi.string().min(20),
    foto:joi.string().min(5), //tiene que ser una url
    categoria:joi.string().min(5),
    ingredientes:joi.array().items(joi.string().min(2)) // tiene que ser parte de los ingredientes
  });
  const result = schema.validate(req.body);
  if(result.error){
      res.status(400).send(result.error.details[0].message);
  } else{
      let receta = req.body;
      receta._id = req.params.id;
      dataReceta.updateReceta(receta);
      res.json(receta);
  }
});

// /recetas/id
router.delete('/:id', async (req, res)=>{
  const receta = await dataReceta.getReceta(req.params.id)
  if(!receta){
      res.status(404).send('Receta no encontrada');
  } else {
      dataReceta.deleteReceta(req.params.id);
      res.status(200).send('Receta eliminada');
  }
});

export {router};
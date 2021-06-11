import express from 'express';
const router = express.Router();
import joi from 'joi';
import connection from '../data/connection.js'
import mongodb from 'mongodb';
import validate from '../data/paymentValidator.js'
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
  let pedido = req.body;
    if (pedido.estado=='NUEVO' || pedido.estado=='RECHAZADO') {
      if (validate.validate(pedido)) { 
        pedido.estado='APROBADO'
        pedido.paymentStatus = {
          estado:"APROBADO",
          fecha:new Date(),
          trx:parseInt(Math.random()*1000000),
          mensaje:"PAGO APROBADO"
        }
        let result = await clientmongo.db('PaulCocina_DB')
        .collection('pedidos')
        .insertOne(pedido);
        console.log(result)
        res.status(200).send(pedido);
      } else {
        pedido.estado='RECHAZADO'
        pedido.paymentStatus = {
          estado:"RECHAZADO",
          fecha:new Date(),
          trx:null,
          mensaje:"TARJETA DENUNCIADA COMO ROBADA, POR FAVOR DIRIJASE A LA COMISARIA MAS CERCANA"
        }
        res.status(200).send(pedido);
      }
    }
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
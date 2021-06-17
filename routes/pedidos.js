import express from 'express';
const router = express.Router();
import joi from 'joi';
import connection from '../data/connection.js'
import mongodb from 'mongodb';
import validate from '../data/paymentValidator.js'
import mailer from '../data/mailer.js';
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
  clientmongo.db('PaulCocina_DB')
      .collection('pedidos')
      .find()
      .toArray().then(pedidos=>{
        res.status(200).send(pedidos);
      }).catch(error=>{
        res.status(400).send(error);
      })
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
        mailer.sendEmails(pedido)
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

router.put('/:id', async (req, res)=>{
  const clientmongo = await connection.getConnection();
  const query = {_id: new objectId(req.params.id)};
  const newvalues = { $set:{
          estado: req.body.estado
      }
  }
  const result = await clientmongo.db('PaulCocina_DB')
        .collection('pedidos')
        .updateOne(query, newvalues)
        .then(data => {
          res.status(200).send(data)
        }).catch(error => {
          console.log(error)
          res.status(400).send(error)
        })

})

router.delete('/:id', async (req, res)=>{
  const clientmongo = await connection.getConnection();
  clientmongo.db('PaulCocina_DB')
      .collection('pedidos')
      .deleteOne({_id: new objectId(req.params.id)})
      .then(data => {
        res.status(200).send(data)
      }).catch(error => {
        console.log(error)
        res.status(400).send(error)
      })
});

export {router};
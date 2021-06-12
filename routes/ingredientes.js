import express from 'express';
const router = express.Router();
import connection from '../data/connection.js'
import mongodb from 'mongodb';
let objectId = mongodb.ObjectId;
/*
{
  _id: 0,
  nombre: '',
}*/

//  /ingredientes
router.get('/', async function(req, res, next) {
  const clientmongo = await connection.getConnection();
  clientmongo.db('PaulCocina_DB')
      .collection('ingredientes')
      .find()
      .toArray().then(ingredientes=>{
        res.status(200).send(ingredientes);
      }).catch(error=>{
        res.status(400).send(error);
      })
});

router.get('/:id', async (req,res)=>{
  clientmongo.db('PaulCocina_DB')
  .collection('ingredientes')
  .findOne({_id: new objectId(req.params.id)})
  .then(ingredientes=>{
    res.status(200).send(ingredientes);
  }).catch(error=>{
    res.status(400).send(error);
  })
});

router.post('/', async (req, res)=>{   
  let item = req.body
  item._id = null
  const clientmongo = await connection.getConnection();
  clientmongo.db('PaulCocina_DB')
        .collection('ingredientes')
        .insertOne(item)
        .then(data => {
          res.status(200).send(data)
        }).catch(error => {
          console.log(error)
          res.status(400).send(error)
        })
});

router.put('/:id', async (req, res)=>{
  const clientmongo = await connection.getConnection();
  const query = {_id: new objectId(req.params.id)};
  const newvalues = { $set:{
          nombre: req.body.nombre
      }
  }
  clientmongo.db('PaulCocina_DB')
        .collection('ingredientes')
        .updateOne(query, newvalues)
        .then(data => {
          res.status(200).send(data)
        }).catch(error => {
          res.status(400).send(error)
        })

})

router.delete('/:id', async (req, res)=>{
  const clientmongo = await connection.getConnection();
  clientmongo.db('PaulCocina_DB')
      .collection('ingredientes')
      .deleteOne({_id: new objectId(req.params.id)})
      .then(data => {
        res.status(200).send(data)
      }).catch(error => {
        console.log(error)
        res.status(400).send(error)
      })
});

export {router};
import express from 'express';
const router = express.Router();
import dataReceta from '../data/receta.js';
import joi from 'joi';

//  /recetas
router.get('/', async function(req, res, next) {
    let recetas = await dataReceta.getRecetas();
    if(recetas){    
    res.json(recetas);
    } else {
      res.status(404).send('No hay recetas');
    }
});

router.get('/byCategory/:categoria', async function(req, res, next) {
  let recetas = await dataReceta.getRecetasByCategory(req.params.categoria);
  if(recetas){    
    res.json(recetas);
  } else {
    res.status(404).send('No hay recetas');
  }
});
// /recetas/id
router.get('/:id', async (req,res)=>{
  const receta = await dataReceta.getReceta(req.params.id);
  if(receta){
      res.json(receta);
  } else {
      res.status(404).send('Receta no encontrada');
  }
});

router.post('/', async (req, res)=>{   
  const schema = joi.object({
      titulo: joi.string().min(5).required(),
      descripcion: joi.string().min(15).required(),
      instrucciones:joi.string().min(20).required(),
      foto:joi.string().min(5).required(), //tiene que ser una url
      categoria:joi.string().min(2).required(),
      precio:joi.number().required(),
      ingredientes:joi.array().items(joi.string().min(2).required()) // tiene que ser parte de los ingredientes
  });
  delete req.body._id
  const result = schema.validate(req.body);
  if(result.error){
      res.status(400).send(result.error.details[0].message);
  } else{
      let receta = req.body;
      receta = await dataReceta.addReceta(receta);
      res.json(receta);
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
    precio:joi.number().required(),
    ingredientes:joi.array().items(joi.string().min(2)) // tiene que ser parte de los ingredientes
  });
  let item = req.body
  delete item._id
  const result = schema.validate(item);
  if(result.error){
      res.status(400).send(result.error.details[0].message);
  } else{
      let receta = item;
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
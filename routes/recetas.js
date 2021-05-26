import express from 'express';
const router = express.Router();
import dataReceta from '../data/receta.js';
import joi from 'joi';

// /api/recetas/
router.get('/', async function(req, res, next) {
    let recetas = await dataReceta.getRecetas();    
    res.json(recetas);
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
/** validaciones con joi  **/
  const schema = joi.object({
      name: joi.string().alphanum().min(5).required(),
      desc: joi.string().min(5).required(),
  });
  const result = schema.validate(req.body);
  if(result.error){
      res.status(400).send(result.error.details[0].message);
  } else{
      let receta = req.body;
      receta = await dataReceta.addReceta(receta);
      res.json(receta);
  }    
});

router.put('/:id', async (req, res)=>{    
  /** validaciones con joi  **/
  const schema = joi.object({
    name: joi.string().alphanum().min(5).required(),
    desc: joi.string().alphanum().min(5).required(),
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
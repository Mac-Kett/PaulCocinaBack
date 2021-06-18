import express from 'express';
const router = express.Router();
import dataIngrediente from '../data/ingrediente.js';
import joi from 'joi';

// /api/ingredientes/
router.get('/', async function(req, res, next) {
    let ingredientes = await dataIngrediente.getIngredientes();    
    res.json(ingredientes);
});

router.get('/:id', async (req,res)=>{
  const ingrediente = await dataIngrediente.getIngrediente(req.params.id);
  if(ingrediente){
      res.json(ingrediente);
  } else {
      res.status(404).send('Ingrediente no encontrada');
  }
});

router.post('/', async (req, res)=>{    
/** validaciones con joi  **/
  const schema = joi.object({
      nombre: joi.string().min(5).required(),
  });
  const result = schema.validate(req.body);
  if(result.error){
      res.status(400).send(result.error.details[0].message);
  } else{
      let ingrediente = req.body;
      ingrediente = await dataIngrediente.addIngrediente(ingrediente);
      res.json(ingrediente);
  }    
});

router.put('/:id', async (req, res)=>{    
  /** validaciones con joi  **/
  const schema = joi.object({
    nombre: joi.string().min(5).required(),
  });
  const result = schema.validate(req.body);
  if(result.error){
      res.status(400).send(result.error.details[0].message);
  } else{
      let ingrediente = req.body;
      ingrediente._id = req.params.id;
      dataIngrediente.updateIngrediente(ingrediente);
      res.json(ingrediente);
  }
});

router.delete('/:id', async (req, res)=>{
  const ingrediente = await dataIngrediente.getIngrediente(req.params.id)
  if(!ingrediente){
      res.status(404).send('Ingrediente no encontrada');
  } else {
      dataIngrediente.deleteIngrediente(req.params.id);
      res.status(200).send('Ingrediente eliminada');
  }
});

export {router};
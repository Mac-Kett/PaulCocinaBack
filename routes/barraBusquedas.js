import express from 'express';
const router = express.Router();
import dataBarraBusqueda from '../data/barraBusqueda.js';
//import joi from 'joi';

router.get('/:elementoBuscado', async (req,res)=>{
  const resultados = await dataBarraBusqueda.getElementoBuscado(req.params.elementoBuscado);
  if(resultados){
      res.json(resultados);
  } else {
      res.status(404).send('Ingrediente no encontrada');
  }
});

export {router};
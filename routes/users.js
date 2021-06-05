import express from "express";
const router = express.Router();
import dataUsuario from "../data/usuario.js";
import joi from "joi";

/* FALTA AUTORIZACION DE USUARIOS*/

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// /api/usuarios/
router.get("/", async function (req, res, next) {
  let usuarios = await dataUsuario.getUsuarios();
  res.json(usuarios);
});

router.get("/:id", async (req, res) => {
  const receta = await dataUsuario.getUsuario(req.params.id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send("Usuario no encontrada");
  }
});

router.post("/", async (req, res) => {
  const schema = joi.object({
    usuario: joi.string().email().required(),
    contraseña: joi.string().min(5).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  } else {
    let usuario = req.body;
    usuario = await dataUsuario.addUsuario(usuario);
    res.json(usuario);
  }
});

router.put("/:id", async (req, res) => {
  const schema = joi.object({
    usuario: joi.string().email().required(),
    contraseña: joi.string().min(5).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  } else {
    let usuario = req.body;
    usuario._id = req.params.id;
    dataUsuario.updateUsuario(usuario);
    res.json(usuario);
  }
});

router.delete("/:id", async (req, res) => {
  const usuario = await dataUsuario.getUsuario(req.params.id);
  if (!usuario) {
    res.status(404).send("Usuario no encontrada");
  } else {
    dataUsuario.deleteUsuario(req.params.id);
    res.status(200).send("Usuario eliminada");
  }
});

export { router };

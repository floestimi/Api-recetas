// Importamos los models necesarios
const model = require("../models/model");

const usuarios = require('../jsons/users.json');
const jwt = require('jsonwebtoken');
const key = 'clave';

const getRecipe = async (req, res) => {
  const recetas = await model.getRecipe();
  res.json(recetas);
};

const getRecipeById = async (req, res) => {
  const id = parseInt(req.params.id);
  const recetas = await model.getRecipeById(id);
  if (recetas) {
    res.json(recetas);
  } else {
    res.status(404).json({ message: "Receta no encontrada" });
  }
};

const createRecipe = async (req, res) => {
  const createdRecipe = await model.createRecipe(req.body);
  if (createdRecipe) {
    res.json(createdRecipe);
  } else {
    res.status(500).json({ message: "Se rompió el servidor" });
  }
};

const updateRecipe = async (req, res) => {
  const id = parseInt(req.params.id);
  const recetas = await model.getRecipeById(id);
  if (recetas) {
    const updateRecipe = await model.updateRecipe(parseInt(req.params.id), {
      ...recetas,
      ...req.body,
    });

    if (updateRecipe) {
      res.json(updateRecipe);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Receta no encontrada" });
  }
};

const deleteRecipe = async (req, res) => {
  const id = parseInt(req.params.id);
  const recetas = await model.getRecipeById(id);
  if (recetas) {
    const result = await model.deleteRecipe(parseInt(req.params.id));

    if (result) {
      res.json(recetas);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Receta no encontrada" });
  }
};

const login = (req, res) =>{
  const {email, pass} = req.body;
  
  if (!email || !pass){
      return res.status(401).json({msj: 'Falta usuario o contraseña'});
  }

  const usuarioExiste = usuarios.find(user=> user.email ===email && user.pass===pass);
  if (!usuarioExiste){
      return res.status(401).json({msj:'Usuario o clave no válidos'});
  }

  const token = jwt.sign({userId: email.id, username:usuarioExiste.usuarios},key);
  res.token = token;
  res.send({token});
 }

module.exports = {
  getRecipe,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  login
};

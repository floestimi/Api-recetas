const express = require("express");
const route = express.Router();
// Importamos los controllers necesarios
const controller = require("../controllers/controller");

route.get("/", controller.getRecipe);

route.get("/:id", controller.getRecipeById);

route.post("/", controller.createRecipe);

route.put("/:id", controller.updateRecipe);

route.delete("/:id", controller.deleteRecipe);

module.exports = route;
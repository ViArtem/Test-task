import { Router } from "express";

import CarController from "../controllers/carController.js";

const carRoute = new Router();

carRoute.post("/create", CarController.create);

carRoute.put("/edit", CarController.edit);

carRoute.delete("/delete", CarController.delete);

carRoute.get("/get/one", CarController.getById);

carRoute.get("/get/all", CarController.getAll);

export { carRoute };

import xml2js from "xml2js";

import CarService from "../services/carService.js";
import СarValidation from "../extentions/carValidation.js";
import ApiError from "../extentions/apiErrors.js";

class CarController {
  constructor() {}

  #carValidation(carData, validationFunctionName) {
    const validationMethod = {
      createCar: СarValidation.createCar,
      deleteOrGetOneCar: СarValidation.deleteOrGetOneCar,
      editCar: СarValidation.editCar,
    };

    const { error } = validationMethod[validationFunctionName](carData);

    if (error) {
      throw ApiError.BadRequest(error.message);
    }
  }

  //
  create = async (req, res, next) => {
    try {
      let carData = req.body;

      if (!carData) {
        carData = [
          {
            Date: new Date().toLocaleDateString(),
            BrandName: "Empty",
            Price: 1234,
          },
        ];
      }

      // validation of input data
      this.#carValidation(carData, "createCar");

      const carRecord = await CarService.create(carData);

      return res.status(200).json(carRecord);
    } catch (error) {
      next(error);
    }
  };

  //
  delete = async (req, res, next) => {
    try {
      let carIds = req.body;

      this.#carValidation(carIds, "deleteOrGetOneCar");

      const deletedCars = await CarService.delete(carIds);

      return res.status(200).json(deletedCars);
    } catch (error) {
      next(error);
    }
  };

  //
  edit = async (req, res, next) => {
    try {
      let editCarData = req.body;

      this.#carValidation(editCarData, "editCar");

      const editedCar = await CarService.edit(editCarData);

      return res.status(200).json(editedCar);
    } catch (error) {
      next(error);
    }
  };

  //
  getById = async (req, res, next) => {
    try {
      const carIds = req.body;

      this.#carValidation(carIds, "deleteOrGetOneCar");

      const cars = await CarService.getById(carIds);

      return res.status(200).send(cars);
    } catch (error) {
      next(error);
    }
  };
}

export default new CarController();

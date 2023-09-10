import xml2js from "xml2js";

import CarService from "../services/carService.js";
import СarValidation from "../extentions/carValidation.js";
import ApiError from "../extentions/apiErrors.js";

class CarController {
  constructor() {}

  async #parseXml(xml) {
    try {
      const parsedData = await xml2js.parseStringPromise(xml, {
        explicitArray: false,
      });

      return parsedData["Document"]["Car"];
    } catch (error) {
      next(error);
    }
  }

  create = async (req, res, next) => {
    try {
      let carData = req.body;

      if (req.is("xml")) {
        carData = await this.#parseXml(carData);

        if (!carData) {
          carData = [
            {
              Date: new Date().toLocaleDateString(),
              BrandName: "Empty",
              Price: 1234,
            },
          ];
        }
      } else {
        carData = [carData];
      }

      const { error } = СarValidation.createCar(carData);

      if (error) {
        throw ApiError.BadRequest(error.message);
      }

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

      if (req.is("xml")) {
        carIds = await this.#parseXml(carIds);
      }

      const { error } = СarValidation.deleteOrGetOneCar(carIds);

      if (error) {
        throw ApiError.BadRequest(error.message);
      }

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

      if (req.is("xml")) {
        editCarData = await this.#parseXml(editCarData);
      }

      const { error } = СarValidation.editCar(editCarData);

      if (error) {
        throw ApiError.BadRequest(error.message);
      }

      const editedCar = await CarService.edit(editCarData);

      return res.status(200).json(editedCar);
    } catch (error) {
      next(error);
    }
  };

  //
  async getById(req, res, next) {
    try {
      let carIds = req.body;

      if (req.is("xml")) {
        carIds = await this.#parseXml(carIds);
      }

      const { error } = СarValidation.deleteOrGetOneCar(carIds);

      if (error) {
        throw ApiError.BadRequest(error.message);
      }

      const cars = await CarService.getById(carIds);

      return res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  }
}

export default new CarController();

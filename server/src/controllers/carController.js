import xml2js from "xml2js";

import CarService from "../services/carService.js";
import СarValidation from "../validation/carValidation.js";

class CarController {
  constructor() {}

  _parseXml = async (xml) => {
    try {
      const pasedData = await xml2js.parseStringPromise(xml);
      const cars = pasedData["Document"]["Car"].map((elm) => {
        return {
          date: elm["Date"][0],
          name: elm["BrandName"][0],
          price: elm["Price"][0],
        };
      });

      return cars;
    } catch (error) {
      console.log(error);
    }
  };

  async create(req, res, next) {
    try {
      let carData = req.body;

      // TODO: винести це в окрему функцію
      if (req.is("xml")) {
        const pasedData = await xml2js.parseStringPromise(carData);

        if (pasedData["Document"]["Car"]) {
          carData = pasedData["Document"]["Car"].map((elm) => {
            return {
              date: elm["Date"][0],
              name: elm["BrandName"][0],
              price: elm["Price"][0],
            };
          });
        }

        //
      } else {
        carData = [carData];
      }

      const { error } = СarValidation.createCar(carData);

      if (error) {
        // TODO: винести це в кастомну відловку помилок
        return res.status(400).json({ error: true, message: error.message });
      }

      const carRecord = await CarService.create(carData);

      return res.status(200).json(carRecord);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //
  async delete(req, res, next) {
    try {
      const { error } = СarValidation.deleteOrGetOneCar(req.body);

      if (error) {
        // TODO: винести це в кастомну відловку помилок
        return res.status(400).json({ error: true, message: error.message });
      }
      const deletedCars = await CarService.delete(req.body.id);

      return res.status(200).json(deletedCars);
    } catch (error) {}
  }

  //
  async edit(req, res, next) {
    try {
    } catch (error) {}
  }

  //
  async getById(req, res, next) {
    try {
      const cars = await CarService.getById(req.body.id);

      const { error } = СarValidation.deleteOrGetOneCar(req.body);

      if (error) {
        // TODO: винести це в кастомну відловку помилок
        return res.status(400).json({ error: true, message: error.message });
      }

      return res.status(200).json(cars);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CarController();

import CarRequest from "../database/mongo/carRequest.js";

class CarService {
  constructor() {}

  async create(carsArray) {
    try {
      const newCars = carsArray.map(async (carObject) => {
        return await CarRequest.create(
          carObject.Date,
          carObject.BrandName,
          Number(carObject.Price)
        );
      });

      return await Promise.all(newCars);
    } catch (error) {
      throw error;
    }
  }

  //
  async delete(idCarsArray) {
    try {
      const deleteCarsArray = idCarsArray.map((IdCarObject) => {
        return IdCarObject.Id;
      });

      const deleteCarsStatus = await CarRequest.delete(deleteCarsArray);

      return deleteCarsStatus;
    } catch (error) {
      throw error;
    }
  }

  //
  async edit(carsArray) {
    try {
      const editedCars = carsArray.map(async (carObject) => {
        return await CarRequest.edit(carObject);
      });

      return await Promise.all(editedCars);
    } catch (error) {
      throw error;
    }
  }

  //
  async getById(carsIds) {
    try {
      const cars = carsIds.map((IdCarObject) => {
        return IdCarObject.Id;
      });

      const allCars = await CarRequest.findById(cars);

      return allCars;
    } catch (error) {
      throw error;
    }
  }

  //
  async getAll() {
    try {
      const allCars = await CarRequest.findAll();

      return allCars;
    } catch (error) {
      throw error;
    }
  }
}

export default new CarService();

import CarRequest from "../database/mongo/carRequest.js";

class CarService {
  constructor() {}

  async create(carsArray) {
    try {
      const newCars = carsArray.map(async (carObject) => {
        return await CarRequest.create(
          new Date(),
          carObject.name,
          Number(carObject.price)
        );
      });

      return await Promise.all(newCars);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(idCarsArray) {
    try {
      const deletedCars = await CarRequest.delete(idCarsArray);

      return deletedCars;
    } catch (error) {
      console.log(error);
    }
  }

  async edit() {
    try {
    } catch (error) {}
  }

  async getById(carsIds) {
    try {
      const car = await CarRequest.findById(carsIds);
      return car;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CarService();

import CarRequest from "../database/mongo/carRequest";

class CarService {
  constructor() {}

  async create({ id, date, name, prise }) {
    try {
      const newCar = await CarRequest.create(id, date, name, prise);

      return newCar;
    } catch (error) {}
  }

  async delete() {
    try {
    } catch (error) {}
  }

  async edit() {
    try {
    } catch (error) {}
  }

  async getOne() {
    try {
    } catch (error) {}
  }
}

export default new CarService();

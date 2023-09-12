import Cars from "./model/CreateCarRecord.js";

class CarRequest {
  async #errorHandler(databasePromise) {
    try {
      const promiseResult = await databasePromise;

      return promiseResult;
    } catch (error) {
      throw error;
    }
  }

  async create(date, name, price) {
    const car = await this.#errorHandler(
      new Cars({
        brand_name: name,
        price,
        date,
      })
    );

    return car.save();
  }

  async delete(carsIds) {
    return await this.#errorHandler(Cars.deleteMany({ _id: { $in: carsIds } }));
  }

  async edit(carObject) {
    return await this.#errorHandler(
      Cars.findByIdAndUpdate(
        { _id: carObject.Id },
        {
          $set: {
            brand_name: carObject.BrandName,
            prise: carObject.Price,
            date: carObject.Date,
          },
        }
      )
    );
  }

  async findById(carsIds) {
    return await this.#errorHandler(Cars.find({ _id: { $in: carsIds } }));
  }

  async findAll() {
    return await this.#errorHandler(Cars.find({}));
  }
}
export default new CarRequest();

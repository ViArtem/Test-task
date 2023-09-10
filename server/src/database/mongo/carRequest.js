import Cars from "./model/CreateCarRecord.js";

class CarRequest {
  async #errorHandler(databasePromise) {
    try {
      const promiseResult = await databasePromise;

      return promiseResult;
    } catch (error) {
      console.log(error);
      return { message: error.message };
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

  async edit(id, date, name, prise) {
    return await this.#errorHandler(
      Cars.findByIdAndUpdate(
        { id },
        {
          $set: {
            brand_name: name,
            prise,
            date,
          },
        }
      )
    );
  }

  async findById(carsIds) {
    return await this._errorHandler(Cars.find({ _id: { $in: carsIds } }));
  }
}
export default new CarRequest();

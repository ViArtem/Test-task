import Cars from "./model/CreateCarRecord.js";

class CarRequest {
  async _errorHandler(databasePromise) {
    try {
      const promiseResult = await databasePromise();

      return promiseResult;
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  }

  async create(id, date, name, prise) {
    return await this._errorHandler(
      await new Cars({
        id,
        brand_name: name,
        prise,
        date,
      }).save()
    );
  }

  async delete(id) {
    return await this._errorHandler(
      Cars.deleteOne({
        id,
      })
    );
  }

  async edit(id, date, name, prise) {
    return await this._errorHandler(
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

  async findById(id) {
    return await this._errorHandler(
      Cars.findOne({
        id,
      })
    );
  }
}
export default new CarRequest();

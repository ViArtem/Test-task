import Joi from "joi";

class CarValidation {
  createCar(carObject) {
    const schema = Joi.object({
      data: Joi.date().required(),
      name: Joi.string().min(1).required(),
      price: Joi.number().min(1).required(),
    });

    return schema.validate(carObject);
  }
}

export default new CarValidation();

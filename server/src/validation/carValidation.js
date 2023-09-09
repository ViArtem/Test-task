import Joi from "joi";

class CarValidation {
  createCar(carsArray) {
    const schema = Joi.array().items({
      date: Joi.date().required(),
      name: Joi.string().min(1).required(),
      price: Joi.number().min(1).required(),
    });

    return schema.validate(carsArray);
  }

  deleteOrGetOneCar(carsArray) {
    const schema = Joi.object({
      id: Joi.array().items(Joi.string().min(1).required()),
    });

    return schema.validate(carsArray);
  }

  editCar(carsArray) {
    const schema = Joi.array().items({
      id: Joi.string().min(1).required(),
      date: Joi.date().iso().required(),
      name: Joi.string().min(1).required(),
      price: Joi.number().min(1).required(),
    });

    return schema.validate(carsArray);
  }
}

export default new CarValidation();

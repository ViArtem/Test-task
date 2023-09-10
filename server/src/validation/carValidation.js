import Joi from "joi";

class CarValidation {
  createCar(carsArray) {
    const schema = Joi.array().items({
      Date: Joi.date().required(),
      BrandName: Joi.string().min(1).required(),
      Price: Joi.number().min(1).required(),
    });

    return schema.validate(carsArray);
  }

  deleteOrGetOneCar(carsArray) {
    const schema = Joi.object({
      Id: Joi.array().items(Joi.string().min(1).required()),
    });

    return schema.validate(carsArray);
  }

  editCar(carsArray) {
    const schema = Joi.array().items({
      Id: Joi.string().min(1).required(),
      Date: Joi.date().iso().required(),
      BrandName: Joi.string().min(1).required(),
      Price: Joi.number().min(1).required(),
    });

    return schema.validate(carsArray);
  }
}

export default new CarValidation();

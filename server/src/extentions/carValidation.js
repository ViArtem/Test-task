import Joi from "joi";

class CarValidation {
  createCar(carsArray) {
    const schema = Joi.array().items({
      Date: Joi.string()
        .regex(/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/)
        .required(),
      BrandName: Joi.string().min(1).required(),
      Price: Joi.number().min(1).required(),
    });

    return schema.validate(carsArray);
  }

  deleteOrGetOneCar(carsArray) {
    const schema = Joi.array().items({
      Id: Joi.string().min(1).required(),
    });

    return schema.validate(carsArray);
  }

  editCar(carsArray) {
    const schema = Joi.array().items({
      Id: Joi.string().min(1).required(),
      Date: Joi.string()
        .regex(/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/)
        .required(),
      BrandName: Joi.string().min(1).required(),
      Price: Joi.number().min(1).required(),
    });

    return schema.validate(carsArray);
  }
}

export default new CarValidation();

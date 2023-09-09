import { Schema, model } from "mongoose";

const carSchema = new Schema({
  id: { type: String, required: true },
  brand_name: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default model("Cars", carSchema);

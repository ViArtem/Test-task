import express from "express";
import bodyParser from "body-parser";
import dotev from "dotenv";

import { carRoute } from "./routes/carRoute.js";
import connectToDatabase from "./database/mongo/connection.js";
import errorMiddleware from "./middleware/errors.js";
import parseXMLOrChangeBody from "./middleware/parseXML.js";

const app = express();
dotev.config();
const PORT = process.env.PORT || 5000;

const middlewares = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.text({ type: "application/xml" }),
  parseXMLOrChangeBody,
  carRoute,
  errorMiddleware,
];
middlewares.forEach((elm) => app.use(elm));

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on port ${PORT}`);
});

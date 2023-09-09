import db from "mongoose";
import dotev from "dotenv";

dotev.config();
const url = process.env.URL;
db.set("strictQuery", false);

async function connectToDatabase() {
  try {
    await db.connect(url, { useNewUrlParser: true });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    return JSON.stringify({ DatabaseConnectError: error });
  }
}
export default connectToDatabase;

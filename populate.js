import "dotenv/config";
import { connectDB } from "./db/connect.js";
import jsonProducts from "./products.json" assert { type: "json" };
import product from "./models/product.js";
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await product.deleteMany();
    await product.create(jsonProducts);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

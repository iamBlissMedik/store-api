import express from "express";
import "express-async-errors";
import "dotenv/config";
import { notFound } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { connectDB } from "./db/connect.js";
import productsRouter from "./routes/products.js";
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});
app.use("/api/v1/products", productsRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    // connectdb
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`server is running on port ${PORT}....`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();

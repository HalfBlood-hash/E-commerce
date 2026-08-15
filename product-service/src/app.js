import express from "express";
import cors from "cors";
import productRouter from "./routes/product.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors(
    {
         origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true
    }
));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/products", productRouter);
app.use(errorHandler);

export { app };

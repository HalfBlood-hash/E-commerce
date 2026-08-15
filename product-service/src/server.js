import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/dbconnection.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 4002;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Product Service Running:", PORT);
        });
    })
    .catch((error) => {
        console.log("Product service failed to start:", error.message);
        process.exit(1);
    });

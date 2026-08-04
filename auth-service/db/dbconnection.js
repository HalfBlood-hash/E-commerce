
import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constant.js";

dotenv.config({ path: "./.env" });
const dbConnectionInstance = await mongoose.connect(process.env.MONGO_URI);
// const connectDB = async () => {
//     try {
//         if (!process.env.MONGO_URI) {
//             throw new Error("MONGO_URI is not defined in the environment");
//         }
//         console.log(process.env.MONGO_URI)
//         const dbConnectionInstance = await mongoose.connect("mongodb+srv://login:login123@cluster0.mnfr8dr.mongodb.net/ecommerceDB?retryWrites=true&w=majority&appName=Cluster0", {
//             dbName: DB_NAME,
//             serverSelectionTimeoutMS: 10000,
//         });

//         console.log(
//             "connection success: running on host:",
//             dbConnectionInstance.connection.host,
//             ":",
//             dbConnectionInstance.connection.port,
//             "/",
//             dbConnectionInstance.connection.name
//         );
//     } catch (error) {
//         console.log("error from db.js file in db connection error:", error);
//     }
// };

export default connectDB;
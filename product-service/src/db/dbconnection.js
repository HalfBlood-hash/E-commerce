import dns from "node:dns";
import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        const dbConnectionInstance = await mongoose.connect(
            "mongodb+srv://login:login123@cluster0.mnfr8dr.mongodb.net/ecommerceDB?retryWrites=true&w=majority&appName=Cluster0",
            {
                dbName: DB_NAME,
                serverSelectionTimeoutMS: 10000
            }
        );

        console.log(
            "Product database connected:",
            dbConnectionInstance.connection.name
        );
    } catch (error) {
        console.log("Product database connection failed:", error);
        throw error;
    }
};

export default connectDB;

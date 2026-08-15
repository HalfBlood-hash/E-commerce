

import dotenv from "dotenv"

import {app} from './app.js'

import connectDB from "./db/dbconnection.js"

dotenv.config({
    path: './.env'
})
const PORT=process.env.PORT|| 4001
connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("app is running on port :",PORT)
    })
})
.catch((error) => {
    console.log("connection failed !!!",error);
    process.exit(1);
});

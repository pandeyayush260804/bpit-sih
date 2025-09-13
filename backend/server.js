import express from "express";
import chalk from "chalk";
import {indexRoute} from "./api/v1/routes/index.js"
import { Error404 } from "./utils/middlewares/404.js";
import cors from "cors";
import { createConnection } from "./utils/db/connection.js";
import dotenv from "dotenv";
const app=express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/v1",indexRoute);
app.use(Error404);
const promise=createConnection();
promise.then(()=>{
    console.log(chalk.greenBright.bold("Database connection created"));
    const server=app.listen(9999, (err)=>{
        if(err){
            console.log(chalk.redBright.bold("Server Crashh", err));
        }
        else{
            console.log(chalk.greenBright.bold("Server upp and running", server.address().port));
        }
    })
}).catch(err=>{
    console.log(chalk.redBright.bold("DB Crashhhhh . . ."),err);
})

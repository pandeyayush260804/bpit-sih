import express from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";

import { indexRoute } from "./api/v1/routes/index.js";
import { Error404 } from "./utils/middlewares/404.js";
import { createConnection } from "./utils/db/connection.js";

dotenv.config(); // ✅ load env FIRST

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://bpit-sih.vercel.app",
      "https://bpit-sih-ayush-pandeys-projects-c697cb09.vercel.app",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());


/* ---------- ROUTES ---------- */
app.use("/api/v1", indexRoute);
app.use(Error404);

/* ---------- SERVER + DB ---------- */
const PORT = process.env.PORT || 9999;

createConnection()
  .then(() => {
    console.log(chalk.greenBright.bold("Database connection created"));

    app.listen(PORT, () => {
      console.log(
        chalk.greenBright.bold(`Server up and running on port ${PORT}`)
      );
    });
  })
  .catch((err) => {
    console.log(chalk.redBright.bold("DB Crash ❌"), err);
    process.exit(1);
  });

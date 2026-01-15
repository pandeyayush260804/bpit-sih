import express from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";

import { indexRoute } from "./api/v1/routes/index.js";
import { Error404 } from "./utils/middlewares/404.js";
import { createConnection } from "./utils/db/connection.js";

dotenv.config(); // ✅ load env FIRST

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app", // update later
    ],
    credentials: true,
  })
);

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

import express, { Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
const app = express();
import ejs from "ejs";
import path from "path";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("combined"));
app.use(helmet());

import backendRoute from "./routes/backend.routes";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/node-backend", cors(), backendRoute);

const PORT = 5000;

const server = app
  .listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });

import db from "../database/connection/machine.DB.connection";

db.on("error", (err: any): void => {
  console.log(err);
});

db.on("connected", (con: any): void => {
  console.log("DB connected");
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logger Error ${err}`);
  server.close(() => process.exit(1));
});

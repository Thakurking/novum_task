import express, { Application } from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { CronJob } from "cron";
import { fileapath, composeReader } from "./scanner";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

const job = new CronJob(
  "* * * * * *",
  function () {
    console.log("Scanning Docker Compose File");
    composeReader(fileapath);
  },
  null,
  true,
  "Asia/Kolkata"
);

job.start();

const PORT = process.env.PORT || 5001;

const server = app
  .listen(PORT, () => {
    console.log(`Scanner Server is running on ${PORT}`);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error ${err}`);
  server.close(() => process.exit(1));
});

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const ejs = require('ejs');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("combined"));
app.use(helmet());

const backendRoute = require("./routes/backend.routes");

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use("/node-backend", cors(), backendRoute);

const PORT = 5000;

const server = app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

process.on("unhandledRejection", (err, promis) => {
  console.log(`Logger Error ${err}`);
  server.close(() => process.exit(1));
});
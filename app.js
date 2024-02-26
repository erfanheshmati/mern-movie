const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const userRoute = require("./routes/userRoute");
const { errorHandler } = require("./middlewares/error");
require("dotenv").config();
require("./db");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRoute);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`The server is listening on port ${process.env.PORT}`);
});

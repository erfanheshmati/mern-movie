const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const userRoute = require("./routes/userRoute");
const { errorHandler } = require("./middlewares/error");
require("dotenv").config();
require("./db");
const cors = require("cors");
const { handleNotFound } = require("./utils/helper");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRoute);
app.use("/*", handleNotFound);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`The server is listening on port ${process.env.PORT}`);
});

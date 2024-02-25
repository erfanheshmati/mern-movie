const express = require("express");
const userRoute = require("./routes/userRoute");
require("./db");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/user", userRoute);

app.listen(5000, () => {
  console.log("The server is listening on port 5000");
});

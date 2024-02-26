const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://heshmati74:${process.env.DB_PASS}@mern-movie.yhxe482.mongodb.net/?retryWrites=true&w=majority&appName=mern-movie`
  )
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log("Database connection failed", error);
  });

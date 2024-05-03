const express = require("express");
const app = express();
const Indexroutes = require("./routes/IndexnRoute");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use("/v1", Indexroutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("Mongo Connected.!!"))
  .catch((err) => console.log("Error to Connecting =====>", err));
app.listen(process.env.PORT || 4000, () => console.log("Server start.!!"));

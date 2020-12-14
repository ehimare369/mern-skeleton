import config from "./../config/config";
import app from "./express";
import mongoose from "mongoose";
require("dotenv").config();

mongoose.Promise = global.Promise;

// Connecting to database
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Veryfing connection to database
const db = mongoose.connection;
db.on("error", () => {
  throw new Error(`Unable to connect to MongoDB database: ${config.mongoUri}`);
});

db.on("connected", () => {
  console.info(`Connected to MongoDB database ${config.mongoUri}`);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Server listening on specific port
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server listening on port: ${config.port}`);
});

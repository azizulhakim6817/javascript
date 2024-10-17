const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const router = require("./routers/student.js");

const app = express();
const port = 9000;

//mongodb url management...........
const url = "mongodb://localhost:27017";
const dbName = "StudentDB";
let db = null;

//conncet is MongoDB ...............
const conncetToDB = async () => {
  const client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  console.log("Connected to MongoDB");
  return db;
};

app.use(bodyParser.json());

//mongodb ....conncetToDB call...Middleware...........................
conncetToDB()
  .then((database) => {
    app.use((req, res, next) => {
      req.db = database;
      next();
    });

    //router handlers...........
    app.use("/api", router);
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

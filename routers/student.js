const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

//create route.........................................
router.post("/create", async (req, res) => {
  const db = req.db;
  const reqBody = req.body;
  try {
    const result = await db.collection("student").insertOne(reqBody);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

//1. More Data get(find_all) route...............................................
router.get("/get", async (req, res) => {
  const db = req.db;
  try {
    const result = await db.collection("student").find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

//2. 1-Data get/details single(find_one) Route.
router.get("/get-single/:id", async (req, res) => {
  const db = req.db;
  const id = req.params.id;
  try {
    const result = await db
      .collection("student")
      .findOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update routes.................................
router.post("/update/:id", async (req, res) => {
  const db = req.db;
  const id = req.params.id;
  const reqBody = req.body;
  try {
    const result = await db
      .collection("student")
      .updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete // get = one(1) routes...........................
//router.get("/delete/:id", async (req, res) => {
router.delete("/delete/:id", async (req, res) => {
  const db = req.db;
  const id = req.params.id;

  try {
    const result = await db
      .collection("student")
      .deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete // get = all routes...........................
//router.get("/delete/:id", async (req, res) => {
router.delete("/all-delete/", async (req, res) => {
  const db = req.db;
  try {
    const result = await db.collection("student").deleteMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

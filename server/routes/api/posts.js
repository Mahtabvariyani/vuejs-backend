const express = require("express");
const MongoDB = require("mongodb");

const router = express.Router();

//Get Posts

router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

//add Posts

router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    description: req.body.description,
    createdAt: new Date(),
  });

  res.status(201).send();
});

//DELETE POSTS

router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new MongoDB.ObjectId(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await MongoDB.MongoClient.connect(
    "mongodb+srv://mahtabvariyani:lhEjHFrhPdzyIHRe@vuejstodo.0jimujc.mongodb.net/?retryWrites=true&w=majority"
  );

  return client.db("vuejstodo").collection("vuejstodo");
}

module.exports = router;

const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  //db("posts")
  db.select("id", "title", "contents")
    .from("posts")
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: "Error getting posts" });
    });
});

router.get("/:id", (req, res) => {
  db("posts")
    .where({ id: req.params.id })
    .first()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ message: "Error getting posts" });
    });
});

router.post("/", (req, res) => {
  const post = req.body;
  db("posts")
    .insert(post, "id")
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ message: "Error getting posts" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  db("posts")
    .where("id", "=", req.params.id)
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({ message: "Error getting posts" });
    });
});

router.delete("/:id", (req, res) => {});

module.exports = router;

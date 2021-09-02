// implement your posts router here
const express = require("express");
const server = require("../server");

const router = express.Router();

const Post = require("./posts-model");

module.exports = router;

router.get("/", async (req, res) => {
  try {
    console.log("getting posts with async await");
    const posts = await Post.find();
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "posts not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The posts information could not be retrieved" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The posts information could not be retrieved" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await req.body;
    if (!newPost.title || !newPost.contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
    } else {
      Post.insert(newPost);
      res.status(201).json(newPost);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the post to the database",
    });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  try {
    if (!changes.title || !changes.contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
    } else {
      const updatedPost = await Post.update(id, changes);
      if (!updatedPost) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(201).json(updatedPost);
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The post information could not be modified" });
  }
});

// router.post("/", (req, res) => {
//   const newPost = req.body;

//   if (!newPost.title || !newPost.contents) {
//     res
//       .status(400)
//       .json({ message: "Please provide title and contents for the new post" });
//   } else {
//     Post.insert(newPost)
//       .then((post) => {
//         res.json(post);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({
//           message: "There was an error while saving the post to the database",
//         });
//       });
//   }
// });

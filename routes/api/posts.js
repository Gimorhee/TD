const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const PetProfile = require("../../models/PetProfile");
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route GET api/posts
// @desc Get all posts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }).populate("user", ["name", "avatar"]);

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error!");
  }
});

// @route GET api/posts/user/:user_id
// @desc Get all posts by a certain user
// @access Private
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.user_id });

    res.json(posts);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Sever Error!");
  }
});

// @route GET api/posts/:post_id
// @desc Get a post by its id
// @access Private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Sever Error!");
  }
});

// @route POST api/posts
// @desc Create a post
// @access Private
router.post("/", [auth, [check("text", "Text is required").not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    const petProfile = await PetProfile.findOne({ user: req.user.id });

    let postObj = {
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      pet: petProfile.name,
    };

    let post = await new Post(postObj);

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error!");
  }
});

// @route DELETE api/posts/:post_id
// @desc Delete a post by its id
// @access Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user authorization
    if (post.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "User Not Authorized" });
    }

    await post.remove();

    res.json({ msg: "Post Removed" });
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Sever Error!");
  }
});

// @route PUT api/posts/like/:post_id
// @desc Like a post
// @access Private
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    const user = await User.findById(req.user.id);

    // Check if the post has been already liked
    if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: "Post has been already liked" });
    }

    const newLike = {
      user: req.user.id,
      avatar: user.avatar,
    };

    post.likes.unshift(newLike);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error!");
  }
});

// @route PUT api/posts/unlike/:post_id
// @desc Unlike a post
// @access Private
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Check if the post has been already liked
    if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: "You must like the post first!" });
    }

    post.likes = post.likes.filter((like) => like.user.toString() !== req.user.id);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error!");
  }
});

// @route POST api/posts/comment/:post_id
// @desc Comment on a post
// @access Private
router.post("/comment/:post_id", [auth, check("text", "Text is required").not().isEmpty()], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.post_id);
    const petProfile = await PetProfile.findOne({ user: req.user.id });

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const newComment = {
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      pet: petProfile.name,
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Sever Error!");
  }
});

// @route DELETE api/posts/comment/:post_id/:comment_id
// @desc Delete a comment on a post by its id
// @access Private
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    const theComment = post.comments.filter((comment) => comment._id.toString() === req.params.comment_id);

    // Check if there is a comment
    if (theComment.length === 0) {
      return res.status(400).json({ msg: "Comment not found" });
    }

    // Check user authorization
    if (theComment[0].user.toString() !== req.user.id) {
      return res.status(400).json({ msg: "User not authorized" });
    }

    post.comments = post.comments.filter((comment) => comment._id.toString() !== req.params.comment_id);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Sever Error!");
  }
});

module.exports = router;

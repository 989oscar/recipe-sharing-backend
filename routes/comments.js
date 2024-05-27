const router = require("express").Router();
const Comment = require("../models/Comment");

// Get comments for a recipe
router.get("/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  try {
    const comments = await Comment.findAll({ where: { recipeId } });
    res.json(comments);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Add a new comment
router.post("/add", async (req, res) => {
  const { recipeId, userId, content } = req.body;
  try {
    const newComment = await Comment.create({ recipeId, userId, content });
    res.json("Comment added!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;

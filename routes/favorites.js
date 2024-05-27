const router = require("express").Router();
const Favorite = require("../models/Favorite");

// Get favorites for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const favorites = await Favorite.findAll({ where: { userId } });
    res.json(favorites);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Add a new favorite
router.post("/add", async (req, res) => {
  const { userId, recipeId } = req.body;
  try {
    const newFavorite = await Favorite.create({ userId, recipeId });
    res.json("Favorite added!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;

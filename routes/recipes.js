const router = require("express").Router();
const Recipe = require("../models/Recipe");

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Add a new recipe
router.post("/add", async (req, res) => {
  const { title, description, ingredients, instructions, imageUrl, createdBy } =
    req.body;
  try {
    const newRecipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      imageUrl,
      createdBy,
    });
    res.json("Recipe added!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Edit a recipe
router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, ingredients, instructions, imageUrl } = req.body;
  try {
    await Recipe.update(
      { title, description, ingredients, instructions, imageUrl },
      { where: { id } }
    );
    res.json("Recipe updated!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Delete a recipe
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Recipe.destroy({ where: { id } });
    res.json("Recipe deleted!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;

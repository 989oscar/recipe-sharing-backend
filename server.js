const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const usersRouter = require("./routes/users");
const recipesRouter = require("./routes/recipes");
const commentsRouter = require("./routes/comments");
const favoritesRouter = require("./routes/favorites");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

sequelize
  .sync()
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.log("Error: " + err));

app.use("/users", usersRouter);
app.use("/recipes", recipesRouter);
app.use("/comments", commentsRouter);
app.use("/favorites", favoritesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

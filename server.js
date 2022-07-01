const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const db = require("./app/models");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

const userRoutes = require("./app/routes/user.routes");
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Guestbook app!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

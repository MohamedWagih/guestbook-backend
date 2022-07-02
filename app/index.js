const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const db = require("./models");

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
    // console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Guestbook app!" });
});

module.exports = app;

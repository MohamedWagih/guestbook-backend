const app = require("./app");
const PORT = process.env.PORT || 8080;

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
} catch (err) {
  console.error(err);
  process.exit();
}

const app = require("./index");
const { PORT } = require("./src/config/config");
const connectDB = require("./src/config/db");

connectDB();

app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});

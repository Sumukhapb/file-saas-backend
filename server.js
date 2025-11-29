const app = require("./index");
const { PORT } = require("./src/config/config")

app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});

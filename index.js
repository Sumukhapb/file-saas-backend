const express = require("express");
const morgan = require("morgan");

const projectsRoutes = require("./src/routes/projects.route");
const authRoutes = require("./src/routes/auth.route");
const errorMiddleware = require("./src/middleware/error.middleware");
const adminRoutes = require("./src/routes/admin.route");
const { cookie } = require("./src/config/config");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/projects", projectsRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

app.use((req, res) => {
  return res.status(404).json({
    status: "Error",
    mssg: "Server Not found!",
  });
});

app.use(errorMiddleware);

module.exports = app;

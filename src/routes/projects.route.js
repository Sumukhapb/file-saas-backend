const express = require("express");

const router = express.Router();
const controller = require("../controllers/projects.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/", controller.getProjects);
router.post("/", controller.createProject);
router.patch("/:id", controller.updateProject);
router.delete("/:id", controller.deleteProject);

module.exports = router;

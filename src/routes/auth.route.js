const express = require("express");

const authControllers = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", authControllers.getUsers);
router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.get("/refresh", authControllers.refresh);
router.post("/logout", authControllers.logout);

module.exports = router;

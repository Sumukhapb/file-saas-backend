const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const requiredRole = require("../middleware/role.middleware");
const { users } = require("../models/user.model");
const { date } = require("joi");

router.use(authMiddleware);
router.use(requiredRole("admin"));

router.get("/users", (req, res) => {
  return res.status(200).json({
    status: "Success",
    count: users.length,
    date: users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
    })),
  });
});

module.exports = router;
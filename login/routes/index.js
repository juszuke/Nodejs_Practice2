"use strict";

const express = require('express');
const router = express.Router();
const authRoutes = require("./authRoutes");
const errorRoutes = require("./errorRoutes");
const homeRoutes = require("./homeRoutes");
const userRoutes = require("./userRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/", errorRoutes);
router.use("/", homeRoutes);

module.exports = router;

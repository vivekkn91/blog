// ../server/routers/users.js
const express = require("express");
const { adduser, editUser, getHello } = require("../controller/users");
const AuthJWT = require("../middleware/auth");
const router = express.Router();

router.post("/user/registerUser", adduser);

// router.get("/user/edit", AuthJWT, editUser);

// router.get("/hello", getHello);

module.exports = router;

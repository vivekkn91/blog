// ../server/routers/users.js
const express = require("express");
const {
  addblog,
  getBlogs,
  editSingleBlog,
  getSingleBlog,
} = require("../controller/blogs");
const AuthJWT = require("../middleware/auth");
const router = express.Router();

router.post("/blog/add", AuthJWT, addblog);
router.get("/blog/show", getBlogs);
router.get("/blogs/:id", getSingleBlog);

router.put("/blogs/:id", AuthJWT, editSingleBlog);
module.exports = router;

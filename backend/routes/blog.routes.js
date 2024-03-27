import express from "express";
const router = express.Router();

import {  createBlog, getBlogs, updateBlog, deleteBlog, increaseViewCount } from "../controllers/blog.controller.js"
import { verifyUser } from "../utils/verifyUser.js"
import { createBlogValidation, updateBlogValidation } from "../utils/validationRules.js"

router.post('/create-blog', verifyUser, createBlogValidation, createBlog)
router.get('/get-blogs', getBlogs)
router.put('/update/:blogId', verifyUser, updateBlogValidation, updateBlog )
router.delete('/delete/:blogId', verifyUser, deleteBlog)
router.post('/increase-view-count/:blogId', increaseViewCount )

export default router;
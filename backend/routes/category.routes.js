import express from "express";
const router = express.Router();

import { createCategory, getCategories, updateCategory,deleteCategory } from "../controllers/category.controller.js"
import { verifyUser } from "../utils/verifyUser.js"

router.post('/create-category', verifyUser, createCategory )
router.get('/getCategories', getCategories)
router.put('/update/:categoryId', verifyUser, updateCategory)
router.delete('/delete/:categoryId', verifyUser, deleteCategory)

export default router;
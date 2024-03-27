import express from "express"
import {verifyUser} from "../utils/verifyUser.js"
import { createComment, getComments, updateComment, likeComment, deleteComment } from "../controllers/comment.controller.js";
import { createCommentValidation, updateCommentValidation } from "../utils/validationRules.js"

const router = express.Router();

router.post('/create-comment/:blogId/:userId/:isReply/:parentCommentId?', verifyUser, createCommentValidation, createComment)
router.get('/get-comments/:blogId?', getComments)
// edit document
router.put('/update/:commentId/:userId/:isReply', verifyUser, updateCommentValidation, updateComment )
// like comment
router.put('/likeComment/:commentId/:userId', verifyUser, likeComment)
router.delete('/delete/:commentId/:userId/:isReply', verifyUser, deleteComment)

export default router;
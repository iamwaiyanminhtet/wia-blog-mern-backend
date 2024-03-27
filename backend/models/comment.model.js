import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema({
    comment : {
        type : String,
        require : true 
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    blogId : {
        type : Schema.Types.ObjectId,
        ref : "Blog"
    },
    // reply to which message
    parentCommentId : {
        type : Schema.Types.ObjectId,
        ref : "Comment"
    },
    likes : [{
        type : Schema.Types.ObjectId
    }],
    replies : [{
        type : Schema.Types.ObjectId,
        ref : "Comment"
    }],
    isReply : {
        type : Boolean,
        default : false
    }
}, {timestamps : true});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
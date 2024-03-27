import mongoose, { Schema } from "mongoose";

const blogSchema = mongoose.Schema({
    title : {
        type : String,
        require : true 
    },
    content : {
        type : String,
        require : true 
    },
    image : {
        type : String,
        default : "https://soliloquywp.com/wp-content/uploads/2016/08/How-to-Set-a-Default-Featured-Image-in-WordPress.png"
    },
    slug : {
        type : String,
        unique : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref  : "User"
    },
    categoryId : {
        type : Schema.Types.ObjectId,
        ref : "Category"
    },
    viewCount : {
        type : Number,
        default : 0
    },
    reactionCount : {
        type : Number,
        default : 0
    },
    reactionCountArray : {
        type : Array,
        default : []
    }
}, {timestamps : true});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
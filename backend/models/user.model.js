import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username : {
        type : String,
        require : true 
    },
    email : {
        type : String,
        require  :true,
        unique : true
    },
    password : {
        type : String,
        require : true
    },
    pfp : {
        type : String
    },
    defaultPfp : {
        type : String,
        default : "https://i.pinimg.com/550x/89/64/99/8964998576cfac440b3a14df748fc670.jpg"
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
}, {timestamps : true});

const User = mongoose.model('User', userSchema);
export default User;
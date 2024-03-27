import mongoose from "mongoose";

const userTrackSchema = mongoose.Schema({
    username : {
        type : String,
        require : true 
    },
    email : {
        type : String,
        require : true
    }
}, {timestamps : true});

const UserTrack = mongoose.model('UserTrack', userTrackSchema);
export default UserTrack;
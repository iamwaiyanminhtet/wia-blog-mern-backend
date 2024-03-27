import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const sendBackUserData = (isUser) => {
     // create jwt token
     const token = jwt.sign({id : isUser._id, isAdmin : isUser.isAdmin}, process.env.JWT_SECRET_KEY)

     // remove password
     const { password:pass , ...user } = isUser._doc;

     return { token, user };
}
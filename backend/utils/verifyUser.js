import { errorHandler } from "./custom-error.js";
import jwt from "jsonwebtoken"

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) {
        return next(errorHandler(401, "You are not allowed to make this request."))
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return next(errorHandler(401, "Unauthorized"));

        req.user = user
        next();
    })
}
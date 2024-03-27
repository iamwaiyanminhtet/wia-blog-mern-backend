import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";

import User from "../models/user.model.js";
import UserTrack from "../models/user-track.model.js";
import { errorHandler } from "../utils/custom-error.js";
import { sendBackUserData } from "../utils/send-back-user-data.js";

export const signUp = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;

    // check if inputs are empty
    if(!username || username === '' || !email || email === '' || !password || password === '' || !confirmPassword || confirmPassword === '') {
        return next(errorHandler(400, "All Fileds are required!"));
    }

    // validate signup data with express-validator
    const validationError = validationResult(req);
    if(!validationError.isEmpty()) {
        next(errorHandler(400, validationError.errors[0].msg));
    }

    // create user in db
    try {
        const hashPassword = bcryptjs.hashSync(password, 10);

        await User.create({
            username,
            email : email.toLowerCase(),
            password : hashPassword 
        });

        await UserTrack.create({
            username, email
        })

        res.status(200).json({message : "Sign up successfully"});
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    // check if inputs are empty
    if(!email || email === '' || !password || password === '') {
        return res.json({message : "All Fields are required"});
    }

    // validate signin data with express-validator
    const validationError = validationResult(req);
    if(!validationError.isEmpty()) {
        next(errorHandler(400, validationError.errors[0].msg));
    }

    try {
        // check if user is in db
        const isUser = await User.findOne({ email : email.toLowerCase() });
        if(!isUser) {
            return next(errorHandler(400, 'Wrong Credentials'));
        }

        // check password
        const validPassword = bcryptjs.compareSync(password, isUser.password)
        if(!validPassword) {
            return next(errorHandler(400, 'Wrong Credentials'));
        }

        const {token, user} = sendBackUserData(isUser)

        res.status(200).cookie('access_token', token, {httpOnly : true}).json(user);

    } catch (error) {
        next(error);
    }
}

export const googleLogin = async (req, res, next) => {
    const {username, email, googlePfp } = req.body

    try {
        const isUser = await User.findOne({email : email.toLowerCase()})

        if(isUser) {
            const {token, user} = sendBackUserData(isUser);
            res.status(200).cookie('access_token', token, {httpOnly : true}).json(user);
        } else {
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            const hashPassword = bcryptjs.hashSync(randomPassword, 10)

            const newUser = await User.create({
                username : username.trim(),
                email : email.toLowerCase(),
                password : hashPassword,
                pfp : googlePfp 
            })

            await UserTrack.create({
                username, email
            })

            const {token, user} = sendBackUserData(newUser);
            res.status(200).cookie('access_token', token, {httpOnly : true}).json(user);
        }
    } catch (error) {
        next(error)
    }

}

export const signout = async (req, res, next) => {
    if(req.body.id) {
        try {
            res.status(200).clearCookie('access_token').json({message : "Signed out successfully"})
        } catch (error) {
            next(error)
        }
    }
}

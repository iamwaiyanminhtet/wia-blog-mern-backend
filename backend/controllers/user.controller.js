import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import UserTrack from "../models/user-track.model.js";
import { errorHandler } from "../utils/custom-error.js";
import { sendBackUserData } from "../utils/send-back-user-data.js";
import bcryptjs from "bcryptjs";

export const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        next(errorHandler(403, "You are not allowed to make this request."))
    }

    try {
        const startIndex = parseInt(req.query.startIndex || 0);
        const limit = parseInt(req.query.limit || 5);
        const sorting = req.query.sorting === "asc" ? 1 : -1;

        const users = await User.find().sort({ createdAt: sorting }).skip(startIndex).limit(limit)

        const usersWithoutPassword = users.map(user => {
            const { password, ...rest } = user._doc
            return rest;
        })

        const totalUsers = await User.countDocuments();

        // one month ago user
        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )

        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        })

        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers
        })

    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user'));
    }

    const curUser = await User.findOne({_id : req.params.userId})

    // validate signup data with express-validator
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        next(errorHandler(400, validationError.errors[0].msg));
    }

    if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    pfp: req.body.pfp,
                }
            }, { new: true }
        )
        const { password:pass, ...user } = updatedUser._doc
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const userToDelete = await User.findById(req.params.userId);
        if (!userToDelete) {
            return next(errorHandler(404, 'User not found'));
        }

        if (req.user.isAdmin || req.user.id === req.params.userId) {
            await User.findByIdAndDelete(req.params.userId);
            return res.status(200).json({ message: "User has been deleted!" });
        } else {
            return next(errorHandler(403, 'You are not allowed to delete this user'));
        }
    } catch (error) {
        next(error);
    }
}

export const userTrackData = async (req, res, next) => {
    try {
        const data = await UserTrack.find().sort({createdAt : -1})

        req.status(200).json(data);
    } catch (error) {
        next(error)
    }
}
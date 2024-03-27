import { body, validationResult } from "express-validator";
import User from "../models/user.model.js"

// user validations
export const signUpValidation = [
    body('username').trim().isString().isLength({min : 3, max : 30}).escape().withMessage("Username : Invalid Value"),

    body('email').trim().isEmail().toLowerCase().escape().withMessage("Email : Invalid Value"),

    body('password').isString().isLength({min : 8}).withMessage('Password must have at least 8 characters'),

    body('password').isStrongPassword({
        minLowercase : 1,
        minUppercase : 1,
        minNumbers : 1,
        minSymbols : 1
    }).withMessage('Please provide strong password (uppercase, lowercase, number, symbols - ~!@#$%^&*)'),

    body('email').custom(async value => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error('This Email address is already in use');
        }
    }),

    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password)
            throw new Error('Passwords do not match!')
        else
            return value === req.body.password;
    }),
]

export const signInValidation = [
    body('email').trim().isEmail().toLowerCase().escape().withMessage("Email : Invalid Value"),

    body('password').isString().isLength({min : 8}).withMessage('Password must have at least 8 characters'),
]

export const updateUserValidation = [
    body('username').optional({nullable : true}).trim().isString().isLength({min : 3, max : 30}).escape().withMessage("Username : Invalid Value"),

    body('email').optional({nullable : true}).trim().isEmail().toLowerCase().escape().withMessage("Email : Invalid Value"),

    body('password').optional({nullable : true}).isString().isLength({min : 8}).withMessage('Password must have at least 8 characters'),
]

// blog validations
export const createBlogValidation = [
    body('title').trim().isString().escape().withMessage("Title : Invalid Value"),

    body('content').trim().isString().withMessage("Content : Invalid Value"),

    body('categoryId').isMongoId().withMessage("Category : Invalid Value"),

    body('userId').isMongoId().withMessage("UserId : Invalid Value")
]

export const updateBlogValidation = [
    body('title').optional({nullable : true}).trim().isString().escape().withMessage("Title : Invalid Value"),

    body('content').optional({nullable : true}).trim().isString().withMessage("Content : Invalid Value"),

    body('categoryId').optional({nullable : true}).isMongoId().withMessage("Category : Invalid Value"),
]

// comment validation
export const createCommentValidation = [
    body('comment').trim().isString().escape().withMessage("Comment : Invalid Value"),

    body('likes').optional({nullable:true}).isArray().withMessage('Likes : Invalid value'),
    body('replies').optional({nullable:true}).isArray().withMessage('Replies : Invalid value')
]

export const updateCommentValidation = [
    body('comment').trim().isString().escape().withMessage("Comment : Invalid Value"),
]
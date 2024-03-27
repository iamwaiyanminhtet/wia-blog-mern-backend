import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import mongoose from "mongoose";

const app = express();
dotenv.config();

// initiate server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})

// db connection
mongoose.connect(process.env.MONGODB_CONNECTION)
.then(() => console.log('connected to the db'))
.catch((error) => console.log(error))

// express config
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/category', categoryRoutes);

// last error middleware
app.use((err, req, res, next) => {
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || "Internal Sever Error";

    res.status(errorStatus).json({
        success : false,
        status : errorStatus,
        message : errorMessage
    })
})

// when deploying on glitch, if you are using import/export, node version must be higher one

// specify in package.json
// "engines": {
//     "node": ">=16.0.0"
//   },
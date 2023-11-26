import express from 'express'
import mongoose  from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './route/user.route.js'
import authRouter from "./route/auth.route.js"
import cookieParser from "cookie-parser"
import listingRouter from './route/listing.route.js'
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongoDB")
}).catch((err)=>{
console.log(err);
})
//we use env to find our data info from users 
//and use process
//to use env cmd-----npm i dotenv
const app=express()
app.listen(3020,()=>{
    console.log("server is running")
})
// app.get('/test',(req,res)=>{
//     res.json({
//         message:'hello world',
//     })
//     res.end();
// })
app.use(express.json());
app.use(cookieParser());
//to get data from postman to see in json form
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/listing',listingRouter)
app.use((err,req,res,next)=>{
    const statusCode =err.statusCode ||500;
    const message =err.message ||"Internal server error"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});

//err which is comming from input of middleware
//next which ffor next middleware

//err.statuscode which we get from input of  middleware
//500 -- internal server error which is alternate
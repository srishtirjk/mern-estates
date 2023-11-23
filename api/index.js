import express from 'express'
import mongoose  from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './route/user.route.js'
import authRouter from "./route/auth.route.js"
dotenv.config();

mongoose
.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongoDB")
}).catch((err)=>{
console.log(err);
})
//we use env to find our data info from users 
//and use process
//to use env cmd-----npm i dotenv
const app=express()
app.listen(3029,()=>{
    console.log("server is running")
})
// app.get('/test',(req,res)=>{
//     res.json({
//         message:'hello world',
//     })
//     res.end();
// })
app.use(express.json());
//to get data from postman to see in json form
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
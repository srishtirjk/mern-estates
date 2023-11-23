import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
export const  signup= async (req,res,next)=>{
   const{username,password,email}=req.body
   const hashedPassword = bcryptjs.hashSync(password,10)
   //this is constant to save req.body to save it in db 
   const newUser =new User({username,password:hashedPassword,email })
   //in it we use User model to save data in db
  // after new keyword we see User this
  // User we see in mongodb where data saved inside User
  try{
    await newUser.save();
    res.status(201).json("user created sucessfully")
  }catch(err){
next(err);
//here next is used as middleware for show error
  }
  
}
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"
//it for to check data from mongo specific id
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


export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong Credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
      //in 32 we add token to cookie ,,we use {httpOnly:true} for to secure from 3rd party
//to checking the id from mongo id we create token
//to make it private from Github we add (process.env.JWT_SECRET) in token
 
  } catch (error) {
    next(error);
  }
};
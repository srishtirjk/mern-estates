import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';
export const  verifyToken = (req,res,next)=>{
 const token =req.cookies.access_token;
 if(!token) return next(errorHandler(401,'unAuthorized'));
 jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err) return next(errorHandler(403,'forbidden'))
 
req.user=user;
//we send the id but we write here req.user or user
next();
//through next() we go to next file controller.js/const =updateUser
//to verify the user is correct or not
});
}
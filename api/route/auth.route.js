//auth for authentication
import express from 'express'
import {signin, google, signup } from '../controller/auth.controller.js'


const router = express.Router()
router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google);
export default router;
import express from 'express';
import {deleteUser, test,updateUser} from '../controller/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';
const router =express.Router();
//here Route r is capital
router.get('/test',test)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
    
;
export default router;
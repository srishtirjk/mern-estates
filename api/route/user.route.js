import express from 'express';
import {test} from '../controller/user.controller.js'
const router =express.Router();
//here Route r iscapital
router.get('/test',test)
    
;
export default router;
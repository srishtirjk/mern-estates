import express from 'express';
import { UpdateListing,getListing, createListing,deleteListing } from '../controller/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router =express.Router()

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken ,deleteListing)
router.post('/update/:id',verifyToken,UpdateListing)
router.get('/get/:id',getListing)
 export default router;
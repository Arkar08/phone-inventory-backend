import express from 'express'
import { getAllPurchaseController, getOnePurchaseController, postPurchaseController } from '../controllers/purchaseController.js';
import { generatePagination } from '../utils/generatePagination.js';
import Purchase from '../models/purchaseSchema.js';


const router  = express.Router();

router.post('/',postPurchaseController)
router.get('/',generatePagination(Purchase),getAllPurchaseController)
router.get('/:id',getOnePurchaseController)

export default router;
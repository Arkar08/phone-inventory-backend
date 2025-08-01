import express from 'express'
import { getAllSellController, getOneSellController, postSellController } from '../controllers/sellController.js';
import { generatePagination } from '../utils/generatePagination.js';
import Sell from '../models/sellSchema.js';


const router = express.Router()

router.post('/',postSellController)
router.get('/',generatePagination(Sell),getAllSellController)
router.get('/:id',getOneSellController)

export default router;
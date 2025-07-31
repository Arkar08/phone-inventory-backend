import express from 'express'
import { deleteItemController, getItemController, getOneItemController, postItemController, updateItemController } from '../controllers/itemController.js';
import { generatePagination } from '../utils/generatePagination.js';
import Items from '../models/itemSchema.js';


const router = express.Router()
router.post('/',postItemController)
router.get('/',generatePagination(Items),getItemController)
router.get("/:id",getOneItemController)
router.patch("/:id",updateItemController)
router.delete("/:id",deleteItemController)

export default router;
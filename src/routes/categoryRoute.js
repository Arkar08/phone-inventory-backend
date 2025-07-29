import express from 'express'
import { deleteCategoryController, getCategoryController, getOneCategoryController, postCategoryController, updateCategoryController } from '../controllers/categoryController.js';


const router = express.Router();

router.post('/',postCategoryController)
router.get('/',getCategoryController)
router.get('/:id',getOneCategoryController)
router.patch('/:id',updateCategoryController)
router.delete('/:id',deleteCategoryController)

export default router;
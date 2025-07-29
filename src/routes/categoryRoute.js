import express from 'express'
import { deleteCategoryController, getCategoryController, getOneCategoryController, postCategoryController, updateCategoryController } from '../controllers/categoryController.js';
import { generatePagination } from '../utils/generatePagination.js';
import Category from '../models/categorySchema.js';


const router = express.Router();

router.post('/',postCategoryController)
router.get('/',generatePagination(Category),getCategoryController)
router.get('/:id',getOneCategoryController)
router.patch('/:id',updateCategoryController)
router.delete('/:id',deleteCategoryController)

export default router;
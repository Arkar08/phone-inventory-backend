import express from 'express'
import { postCompanyController,getCompanyController,getOneCompanyController, updateCompanyController, deleteCompanyController } from '../controllers/companyController.js';
import { generatePagination } from '../utils/generatePagination.js';
import Company from '../models/companySchema.js';

const router = express.Router()

router.post('/',postCompanyController)
router.get('/',generatePagination(Company),getCompanyController)
router.get('/:id',getOneCompanyController)
router.patch('/:id',updateCompanyController)
router.delete('/:id',deleteCompanyController)

export default router;
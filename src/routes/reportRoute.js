import express from 'express'
import { getPurchaseReportController, getSaleReportController, getStockReportController } from '../controllers/reportController.js';


const router = express.Router()

/**
 * @swagger
 * tags:
 *  name : Reports
 *  description : Report Management APIs
 */

/**
 * @swagger
 * /reports/stock:
 *  get:
 *      summary: Get All Stock Reports
 *      tags: [Reports]
 *      responses:
 *       200:
 *         description: A list of Stock Report
 */

/**
 * @swagger
 * /reports/sale:
 *  get:
 *      summary: Get All Sale Reports
 *      tags: [Reports]
 *      responses:
 *       200:
 *         description: A list of Sale Report
 */

/**
 * @swagger
 * /reports/purchase:
 *  get:
 *      summary: Get All Purchase Reports
 *      tags: [Reports]
 *      responses:
 *       200:
 *         description: A list of Purchase Report
 */


router.get('/stock',getStockReportController)
router.get('/sale',getSaleReportController)
router.get('/purchase',getPurchaseReportController)

export default router;  
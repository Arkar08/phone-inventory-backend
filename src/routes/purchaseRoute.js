import express from 'express'
import { getAllPurchaseController, getOnePurchaseController, postPurchaseController } from '../controllers/purchaseController.js';
import { generatePagination } from '../utils/generatePagination.js';
import Purchase from '../models/purchaseSchema.js';


const router  = express.Router();

/**
 * @swagger
 * tags:
 *  name : Purchase
 *  description : Purchase Management APIs 
 */

/**
 * @swagger
 * /purchase:
 *   post:
 *     summary: Create Purchase Item
 *     tags: [Purchase]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               item:
 *                 type: string
 *                 example: 688b27e4289157e25b4662c3
 *               quantity:
 *                  type: number
 *                  example: 10
 *               purchasePrice:
 *                  type: number 
 *                  example: 150000
 *     responses:
 *       201:
 *         description: Purchase Item successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /purchase:
 *   get:
 *     summary: Get all Purchase (with pagination)
 *     tags: [Purchase]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of Purchase
 */

/**
 * @swagger
 * /purchase/{id}:
 *   get:
 *     summary: Get a single Purchase by ID
 *     tags: [Purchase]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Purchase ID
 *     responses:
 *       200:
 *         description: Purchase data
 *       404:
 *         description: Purchase not found
 */


router.post('/',postPurchaseController)
router.get('/',generatePagination(Purchase),getAllPurchaseController)
router.get('/:id',getOnePurchaseController)

export default router;
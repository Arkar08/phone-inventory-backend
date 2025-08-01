import express from 'express'
import { getAllSellController, getOneSellController, postSellController } from '../controllers/sellController.js';
import { generatePagination } from '../utils/generatePagination.js';
import Sell from '../models/sellSchema.js';


const router = express.Router()


/**
 * @swagger
 * tags:
 *  name : Sell
 *  description : Sell Management APIs 
 */

/**
 * @swagger
 * /sell:
 *   post:
 *     summary: Create Sell Item
 *     tags: [Sell]
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
 *               sellPrice:
 *                  type: number 
 *                  example: 150000
 *     responses:
 *       201:
 *         description: Sell Item successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /sell:
 *   get:
 *     summary: Get all Sell (with pagination)
 *     tags: [Sell]
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
 *         description: A list of Sell
 */

/**
 * @swagger
 * /sell/{id}:
 *   get:
 *     summary: Get a single Sell by ID
 *     tags: [Sell]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Sell ID
 *     responses:
 *       200:
 *         description: Sell data
 *       404:
 *         description: Sell not found
 */

router.post('/',postSellController)
router.get('/',generatePagination(Sell),getAllSellController)
router.get('/:id',getOneSellController)

export default router;
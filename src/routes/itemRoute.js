import express from 'express'
import { deleteItemController, getItemController, getOneItemController, postItemController, updateItemController } from '../controllers/itemController.js';
import { generatePagination } from '../utils/generatePagination.js';
import Items from '../models/itemSchema.js';


const router = express.Router()

/**
 * @swagger
 * tags:
 *  name : Items
 *  description : Items Management APIs 
 */

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new Item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               itemName:
 *                 type: string
 *                 example: Remi Note 14
 *               category:
 *                  type: string
 *                  example: 129392939939
 *               company:
 *                  type: string 
 *                  example: 129393
 *               price:
 *                  type: number
 *                  example: 1500000
 *               color:
 *                  type: string 
 *                  example: blue
 *               option:
 *                  type: string
 *                  example: Ram 4 , 16 Gb
 *              
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all Items (with pagination)
 *     tags: [Items]
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
 *         description: A list of Items
 */

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get a single Item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Item ID
 *     responses:
 *       200:
 *         description: Item data
 *       404:
 *         description: Item not found
 */

/**
 * @swagger
 * /items/{id}:
 *   patch:
 *     summary: Update a Item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 example: 10000
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       404:
 *         description: Item not found
 */

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete a Item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 */



router.post('/',postItemController)
router.get('/',generatePagination(Items),getItemController)
router.get("/:id",getOneItemController)
router.patch("/:id",updateItemController)
router.delete("/:id",deleteItemController)

export default router;
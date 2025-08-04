import express from 'express'
import { loginController } from '../controllers/authController.js';


const router = express.Router()

/**
 * @swagger
 * tags :
 *  name: Auth
 *  description: Login Management APIs
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                  type: string
 *                  example: admin123
 *              
 *     responses:
 *       201:
 *         description: Login successfully
 *       400:
 *         description: Invalid input
 */

router.post('/login',loginController)

export default router;
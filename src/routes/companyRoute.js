import express from "express";
import {
  postCompanyController,
  getCompanyController,
  getOneCompanyController,
  updateCompanyController,
  deleteCompanyController,
} from "../controllers/companyController.js";
import { generatePagination } from "../utils/generatePagination.js";
import Company from "../models/companySchema.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Company Management APIs
 */

/**
 * @swagger
 * /company:
 *   post:
 *     summary: Create a new Company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Oppo
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: Invalid input
 */


/**
 * @swagger
 * /company:
 *   get:
 *     summary: Get all Company (with pagination)
 *     tags: [Company]
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
 *         description: A list of Company
 */


/**
 * @swagger
 * /company/{id}:
 *   get:
 *     summary: Get a single Company by ID
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Company ID
 *     responses:
 *       200:
 *         description: Company data
 *       404:
 *         description: Company not found
 */

/**
 * @swagger
 * /company/{id}:
 *   patch:
 *     summary: Update a Company by ID
 *     tags: [Company]
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
 *               name:
 *                 type: string
 *                 example: Updated Company
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       404:
 *         description: Company not found
 */

/**
 * @swagger
 * /company/{id}:
 *   delete:
 *     summary: Delete a Company by ID
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company deleted successfully
 *       404:
 *         description: Company not found
 */


router.post("/", postCompanyController);
router.get("/", generatePagination(Company), getCompanyController);
router.get("/:id", getOneCompanyController);
router.patch("/:id", updateCompanyController);
router.delete("/:id", deleteCompanyController);

export default router;

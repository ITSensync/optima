const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development)

// Get all Categories
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API to manage categories
 */

// Create Category
/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CategoryName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CategoryName:
 *                   type: string
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
  try {
    const { CategoryName } = req.body;
    const [CategoryID] = await db('categories').insert({
      CategoryName, 
      created_at: new Date(),
      updated_at: new Date(),

    });
    res.status(201).json({ CategoryID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read All Categories
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve a list of Category
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of Category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CategoryID:
 *                     type: integer
 *                     example: 1
 *                   CategoryName:
 *                     type: string
 *                     example: "Product 1"
 *                 
 */
router.get('/', async (req, res) => {
  try {
    const categories = await db('categories').select('*');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Read Single Category by ID
/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Retrieve a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Categories ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single Categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CategoryID:
 *                   type: integer
 *                 CategoryName:
 *                   type: string
 *       404:
 *         description: Product not found
 */
router.get('/:id', async (req, res) => {
  try {
    const category = await db('categories').where({ CategoryID: req.params.id }).first();
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update Category
/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a Category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The category ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CategoryName:
 *                 type: string
 *     responses:
 *       200:
 *         description: category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CategoryID:
 *                   type: integer
 *                 CategoryName:
 *                   type: string
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', async (req, res) => {
  try {
    const { CategoryName } = req.body;
    const count = await db('categories').where({ CategoryID: req.params.id }).update({ CategoryName });
    if (count) {
      res.status(200).json({ message: 'Category updated' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Category
/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The category ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete('/:id', async (req, res) => {
  try {
    const count = await db('categories').where({ CategoryID: req.params.id }).delete();
    if (count) {
      res.status(200).json({ message: 'Category deleted' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

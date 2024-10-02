const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development)



// Get all products
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API to manage products
 */


// Create a new product
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProductName:
 *                 type: string
 *               Description:
 *                 type: string
 *               Price:
 *                 type: integer
 *               StockQuantity:
 *                 type: integer
 *               CategoryID:
 *                 type: integer
 *               LocationID:
 *                 type: integer
 *               RfidTagID:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ProductID:
 *                   type: integer
 *                 ProductName:
 *                   type: string
 *                 Description:
 *                   type: string
 *                 Price:
 *                   type: integer
 *                 StockQuantity:
 *                   type: integer
 *                 CategoryID:
 *                   type: integer
 *                 LocationID:
 *                   type: integer
 *                 RfidTagID:
 *                   type: string
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
  const { ProductName, Description, CategoryID, Price, StockQuantity, LocationID, RfidTagID } = req.body;

  try {
    // Insert data ke tabel products
    const [insertedId] = await db('products').insert({
      ProductName,
      Description,
      CategoryID,
      Price,
      StockQuantity,
      LocationID,
      RfidTagID,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Hapus data di tabel rfid berdasarkan RfidTagID yang telah di-insert
    await db('rfid').where({ uid: RfidTagID }).del();

    res.status(200).json({ message: 'Product inserted successfully and RFID data deleted', ProductID: insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to insert product or delete RFID data' });
  }
});


// Read All Products
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ProductID:
 *                     type: integer
 *                     example: 1
 *                   ProductName:
 *                     type: string
 *                     example: "Product 1"
 *                   Description:
 *                     type: string
 *                     example: "Description of product 1"
 *                   Price:
 *                     type: integer
 *                     example: 100
 *                   StockQuantity:
 *                     type: integer
 *                     example: 10
 *                   CategoryID:
 *                     type: integer
 *                     example: 1
 *                   LocationID:
 *                     type: integer
 *                     example: 1
 *                   RfidTagID:
 *                     type: string
 *                     example: "RFID12345"
 */
router.get('/', async (req, res) => {
  try {
    const products = await db('products').select('*');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get a single product by ID
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ProductID:
 *                   type: integer
 *                 ProductName:
 *                   type: string
 *                 Description:
 *                   type: string
 *                 Price:
 *                   type: integer
 *                 StockQuantity:
 *                   type: integer
 *                 CategoryID:
 *                   type: integer
 *                 LocationID:
 *                   type: integer
 *                 RfidTagID:
 *                   type: string
 *       404:
 *         description: Product not found
 */
router.get('/:id', async (req, res) => {
  try {
    const product = await db('products').where({ ProductID: req.params.id }).first();
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProductName:
 *                 type: string
 *               Description:
 *                 type: string
 *               Price:
 *                 type: integer
 *               StockQuantity:
 *                 type: integer
 *               CategoryID:
 *                 type: integer
 *               LocationID:
 *                 type: integer
 *               RfidTagID:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ProductID:
 *                   type: integer
 *                 ProductName:
 *                   type: string
 *                 Description:
 *                   type: string
 *                 Price:
 *                   type: integer
 *                 StockQuantity:
 *                   type: integer
 *                 CategoryID:
 *                   type: integer
 *                 LocationID:
 *                   type: integer
 *                 RfidTagID:
 *                   type: string
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', async (req, res) => {
  try {
    const { ProductName, Description, CategoryID, Price, StockQuantity, LocationID, RfidTagID } = req.body;
    const count = await db('products').where({ ProductID: req.params.id }).update({
      ProductName,
      Description,
      CategoryID,
      Price,
      StockQuantity,
      LocationID,
      RfidTagID
    });
    if (count) {
      res.status(200).json({ message: 'Product updated' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/:id', async (req, res) => {
  try {
    const count = await db('products').where({ ProductID: req.params.id }).delete();
    if (count) {
      res.status(200).json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

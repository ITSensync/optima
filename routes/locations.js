const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development)


// Get all Locations
/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: API to manage locations
 */


// Create a new Locations
/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Create a new locations
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LocationName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Locations created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 LocationName:
 *                   type: string
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
    try {
        const { LocationName } = req.body;
        const [LocationID] = await db('locations').insert({
            LocationName,
            created_at: new Date(),
            updated_at: new Date(),

        });
        res.status(201).json({ LocationID });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Read All Locations
/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Retrieve a list of locations
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: A list of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   LocationID:
 *                     type: integer
 *                     example: 1
 *                   LocationName:
 *                     type: string
 *                     example: "Product 1"
 *                 
 */
router.get('/', async (req, res) => {
    try {
        const locations = await db('locations').select('*');
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Read Single Locations by ID
/**
 * @swagger
 * /api/locations/{id}:
 *   get:
 *     summary: Retrieve a locations by ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Locations ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single locations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 LocationID:
 *                   type: integer
 *                 LocationName:
 *                   type: string
 *       404:
 *         description: Product not found
 */
router.get('/:id', async (req, res) => {
    try {
        const location = await db('locations').where({ LocationID: req.params.id }).first();
        if (location) {
            res.status(200).json(location);
        } else {
            res.status(404).json({ error: 'Location not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Update Locations
/**
 * @swagger
 * /api/locations/{id}:
 *   put:
 *     summary: Update a locations by ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The location ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LocationName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 LocationID:
 *                   type: integer
 *                 LocationName:
 *                   type: string
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', async (req, res) => {
    try {
        const { LocationName } = req.body;
        const count = await db('locations').where({ LocationID: req.params.id }).update({ LocationName });
        if (count) {
            res.status(200).json({ message: 'Locatons updated' });
        } else {
            res.status(404).json({ error: 'Locations not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Locations
/**
 * @swagger
 * /api/locations/{id}:
 *   delete:
 *     summary: Delete a location by ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The location ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *       404:
 *         description: Location not found
 */
router.delete('/:id', async (req, res) => {
    try {
        const count = await db('locations').where({ LocationID: req.params.id }).delete();
        if (count) {
            res.status(200).json({ message: 'Location deleted' });
        } else {
            res.status(404).json({ error: 'Location not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

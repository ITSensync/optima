const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development)


/**
 * @swagger
 * tags:
 *   name: Rfid
 *   description: API to manage Rfid from esp485
 */



// Create a rfid
/**
 * @swagger
 * /api/rfid/add:
 *   post:
 *     summary: Create a new rfid tag
 *     tags: [Rfid]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rfid created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *       400:
 *         description: Invalid input
 */
router.post('/add', async (req, res) => {
    const { uid } = req.body;

    try {
        // insert uid ke tabel rfid
        await db('rfid').insert({
            uid,
            created_at: new Date(),
            updated_at: new Date()
        })

        res.status(200).json({message: 'UID added to RFID table', uid});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Failed to add UID to rfid table'})
    }
})

// Endpoint untuk mendapatkan UID yang ada di tabel RFID
router.get('/', async (req, res) => {
    try {
        const rfids = await db('rfid').select('*');
        res.status(200).json(rfids);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve RFID data' });
    }
});

module.exports = router;

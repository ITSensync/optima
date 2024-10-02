const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const knexConfig = require('../knexfile');
const router = require('./products');
const db = knex(knexConfig.development)


// Get all products
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API to manage auth
 */



// Create a new user
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *               Password:
 *                 type: string
 *               Fullname:
 *                 type: string
 *               Email:
 *                 type: string
 *               Role:
 *                 type: string
 *     responses:
 *       201:
 *         description: user created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Username:
 *                   type: string
 *                 Password:
 *                   type: string
 *                 Fullname: 
 *                   type: string
 *                 Email: 
 *                   type: string
 *                 Role:
 *                   type: string
 *       400:
 *         description: Invalid input
 */
router.post('/register', async (req, res) => {
    const { Username, Password, Fullname, Email, Role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(Password, 10);

        // insert data user
        const [newUserId] = await db('users').insert({
            Username,
            Password: hashedPassword,
            Fullname,
            Email,
            Role,
            created_at: new Date(),
            updated_at: new Date(),
        })

        res.status(201).json({ message: 'User registration successfully', UserID: newUserId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to register user' })
    }
})



// Login user
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid username or password
 *       500:
 *         description: Server error
 */
router.post('/login', async (req, res) => {
    const {Username, Password} = req.body;

    try{
        const user= await db('users').where({ Username }).first();

        if (!user) {
            return res.status(400).json({ message: 'Invalid Username or Password '});
        }
        const isMatch = await bcrypt.compare(Password, user.Password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Username or Password' })
        }

        const token = jwt.sign(
            { UserID: user.UserID, Username: user.Username, Role:user.Role},
            'ngapainsecretsih',
            { expiresIn: '1h' }
        );

        res.status(200).json({token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error'})
    }
})
module.exports = router;
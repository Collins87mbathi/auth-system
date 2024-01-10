const express = require('express');
const router = express.Router();
const { userGetBase, userUpdateBase } = require("../business/user/user");
const { authMiddleware, adminAuthMiddleware } = require("../middlewares/authMiddleware")


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users. Accessible by authenticated users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', authMiddleware, userGetBase);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user's information. Accessible by admin users only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Invalid input or email format.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error
 */

// PUT update a user (Admin only)
router.put('/:id', authMiddleware, adminAuthMiddleware, userUpdateBase);

module.exports = router;
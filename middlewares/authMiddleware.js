const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'secret');
        const user = await User.findByPk(decoded.id);

        if (!user) {
            throw new Error('User not found');
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

const adminAuthMiddleware = async (req, res, next) => {
    try {
        if (req.user && req.user.role === 'admin') {
            return next();
        }
        throw new Error('Not authorized as admin');
    } catch (error) {
        res.status(403).send({ error: 'Access denied' });
    }
};

module.exports = { authMiddleware, adminAuthMiddleware };

const { User } = require('../../models');

// GET all users
const userGetBase = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

// PUT update a user (Admin only)
const userUpdateBase = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        // Basic validation
        if (username && username === '' || email && email === '' || password && password === '') {
          return res.status(400).send({ error: 'Username, email, and password cannot be empty.' });
        }

        // Email validation if email is provided
        if (email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            return res.status(400).send({ error: 'Invalid email format.' });
          }
        }

        const updatedUser = await user.update(req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};


module.exports = { userGetBase, userUpdateBase }
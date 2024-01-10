const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../../models');


const registerBase = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Basic validation
      if (!username || !email || !password) {
        return res.status(400).send({ error: 'Username, email, and password are required.' });
      }
  
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).send({ error: 'Invalid email format.' });
      }
  
      const user = await User.create({ username, email, password });
      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
      res.status(201).send({ user, token });
    } catch (error) {
      res.status(400).send(error);
    }
  };
  

const loginBase = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).send({ error: 'Login failed!' });
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {registerBase, loginBase};

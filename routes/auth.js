const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Login page
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Login handler
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // In a real app, you would check against a database
    // For demo purposes, we'll use a hardcoded user
    if (username === 'farmer' && password === 'password') {
      req.session.isAuthenticated = true;
      req.session.user = { username, role: 'farmer' };
      return res.redirect('/dashboard');
    }
    res.render('login', { error: 'Invalid username or password' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/dashboard');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

module.exports = router;

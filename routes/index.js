const express = require('express');
const router = express.Router();

// Dashboard
router.get('/dashboard', (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/login');
  }
  res.render('dashboard', { user: req.session.user });
});

// Prediction page
router.get('/prediction', (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/login');
  }
  res.render('prediction', { user: req.session.user });
});

// Recommendations page
router.get('/recommendations', (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/login');
  }
  res.render('recommendations', { user: req.session.user });
});

// About page
router.get('/about', (req, res) => {
  res.render('about', { user: req.session.user });
});

// Preview page
router.get('/preview', (req, res) => {
  res.render('preview');
});

module.exports = router;

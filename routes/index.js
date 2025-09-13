const express = require('express');
const router = express.Router();
const FarmData = require('../models/farmData');
const Notification = require('../models/notification');

// Dashboard
router.get('/dashboard', async (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/login');
  }
  
  try {
    const userId = req.session.user._id;
    
    // Get recent farm data
    const recentFarmData = await FarmData.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get unread notifications
    const unreadNotifications = await Notification.find({ 
      userId, 
      isRead: false 
    })
    .sort({ createdAt: -1 })
    .limit(5);
    
    res.render('dashboard', { 
      user: req.session.user, 
      recentFarmData,
      unreadNotifications: unreadNotifications.length
    });
  } catch (err) {
    console.error('Error loading dashboard:', err);
    res.status(500).send('Server error');
  }
});

// Prediction page
router.get('/prediction', async (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/login');
  }
  
  try {
    const userId = req.session.user._id;
    
    // Get user's farm data for form pre-population
    const farmData = await FarmData.find({ userId })
      .sort({ createdAt: -1 })
      .limit(1);
    
    // Get unread notifications count
    const unreadNotifications = await Notification.countDocuments({ 
      userId, 
      isRead: false 
    });
    
    res.render('prediction', { 
      user: req.session.user, 
      farmData: farmData[0] || {},
      unreadNotifications
    });
  } catch (err) {
    console.error('Error loading prediction page:', err);
    res.status(500).send('Server error');
  }
});

// Soil Analysis page
router.get('/soil-analysis', async (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/login');
  }
  
  try {
    const userId = req.session.user._id;
    
    // Get user's soil data
    const soilData = await FarmData.find({ userId, soilData: { $exists: true } })
      .sort({ createdAt: -1 })
      .limit(1);
    
    // Get unread notifications count
    const unreadNotifications = await Notification.countDocuments({ 
      userId, 
      isRead: false 
    });
    
    res.render('soil-analysis', { 
      user: req.session.user, 
      soilData: soilData[0] || {},
      unreadNotifications
    });
  } catch (err) {
    console.error('Error loading soil analysis page:', err);
    res.status(500).send('Server error');
  }
});

// Crop Calendar page
router.get('/crop-calendar', async (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/login');
  }
  
  try {
    const userId = req.session.user._id;
    
    // Get user's crops
    const crops = await FarmData.distinct('crop', { userId });
    
    // Get unread notifications count
    const unreadNotifications = await Notification.countDocuments({ 
      userId, 
      isRead: false 
    });
    
    res.render('crop-calendar', { 
      user: req.session.user, 
      crops,
      unreadNotifications
    });
  } catch (err) {
    console.error('Error loading crop calendar page:', err);
    res.status(500).send('Server error');
  }
});

// Market Prices page
router.get('/market-prices', async (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/login');
  }
  
  try {
    const userId = req.session.user._id;
    
    // Get user's crops
    const crops = await FarmData.distinct('crop', { userId });
    
    // Get unread notifications count
    const unreadNotifications = await Notification.countDocuments({ 
      userId, 
      isRead: false 
    });
    
    res.render('market-prices', { 
      user: req.session.user, 
      crops,
      unreadNotifications
    });
  } catch (err) {
    console.error('Error loading market prices page:', err);
    res.status(500).send('Server error');
  }
});

// Recommendations page
router.get('/recommendations', async (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/login');
  }
  
  try {
    const userId = req.session.user._id;
    
    // Get user's farm data for recommendations
    const farmData = await FarmData.find({ userId })
      .sort({ createdAt: -1 })
      .limit(1);
    
    // Get unread notifications count
    const unreadNotifications = await Notification.countDocuments({ 
      userId, 
      isRead: false 
    });
    
    res.render('recommendations', { 
      user: req.session.user, 
      farmData: farmData[0] || {},
      unreadNotifications
    });
  } catch (err) {
    console.error('Error loading recommendations page:', err);
    res.status(500).send('Server error');
  }
});

// Notifications page
router.get('/notifications', async (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/login');
  }
  
  try {
    const userId = req.session.user._id;
    
    // Get user's notifications
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 });
    
    // Get unread notifications count
    const unreadNotifications = await Notification.countDocuments({ 
      userId, 
      isRead: false 
    });
    
    res.render('notifications', { 
      user: req.session.user, 
      notifications,
      unreadNotifications
    });
  } catch (err) {
    console.error('Error loading notifications page:', err);
    res.status(500).send('Server error');
  }
});

// Profile page
router.get('/profile', async (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/login');
  }
  
  try {
    const userId = req.session.user._id;
    
    // Get user's farm data
    const farmData = await FarmData.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get unread notifications count
    const unreadNotifications = await Notification.countDocuments({ 
      userId, 
      isRead: false 
    });
    
    res.render('profile', { 
      user: req.session.user, 
      farmData,
      unreadNotifications
    });
  } catch (err) {
    console.error('Error loading profile page:', err);
    res.status(500).send('Server error');
  }
});

// About page
router.get('/about', async (req, res) => {
  try {
    let unreadNotifications = 0;
    
    if (req.session.isAuthenticated) {
      const userId = req.session.user._id;
      unreadNotifications = await Notification.countDocuments({ 
        userId, 
        isRead: false 
      });
    }
    
    res.render('about', { 
      user: req.session.user,
      unreadNotifications
    });
  } catch (err) {
    console.error('Error loading about page:', err);
    res.status(500).send('Server error');
  }
});

// Preview page
router.get('/preview', (req, res) => {
  res.render('preview');
});

// Mark notification as read
router.post('/notifications/:id/read', async (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const notificationId = req.params.id;
    const userId = req.session.user._id;
    
    await Notification.findByIdAndUpdate(notificationId, { isRead: true });
    
    res.json({ success: true });
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark all notifications as read
router.post('/notifications/read-all', async (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const userId = req.session.user._id;
    
    await Notification.updateMany(
      { userId, isRead: false },
      { isRead: true }
    );
    
    res.json({ success: true });
  } catch (err) {
    console.error('Error marking all notifications as read:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
module.exports = router;

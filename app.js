require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');
const i18n = require('./i18n');
const User = require('./models/user');
const FarmData = require('./models/farmData');
const Notification = require('./models/notification');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cropYieldDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Session setup
app.use(session({
  secret: 'crop-yield-prediction-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 } // 1 hour
}));

// i18n middleware
app.use((req, res, next) => {
  // Set language based on user preference or browser language
  const lang = req.session.user?.language || req.acceptsLanguages()[0] || 'en';
  req.language = lang;
  res.locals.language = lang;
  
  // Set HTML lang attribute
  res.locals.htmlLang = lang;
  
  next();
});

// Make i18n available in templates
app.use((req, res, next) => {
  res.locals.t = (key) => i18n.t(key, { lng: req.language });
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// Analytics route
app.get('/analytics', async (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/login');
  }
  
  try {
    // Get user data for analytics
    const userId = req.session.user._id;
    const farmData = await FarmData.find({ userId });
    
    // Get unread notifications count
    const unreadNotifications = await Notification.countDocuments({ 
      userId, 
      isRead: false 
    });
    
    res.render('analytics', { 
      user: req.session.user, 
      farmData,
      unreadNotifications
    });
  } catch (err) {
    console.error('Error loading analytics:', err);
    res.status(500).send('Server error');
  }
});

// Language change route
app.post('/language', async (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const { language } = req.body;
    
    // Update user language preference
    await User.findByIdAndUpdate(req.session.user._id, { language });
    
    // Update session
    req.session.user.language = language;
    
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating language:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

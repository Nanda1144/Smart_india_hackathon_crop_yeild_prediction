const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: String,
  phone: String,
  address: String,
  language: { type: String, default: 'en' },
  farmDetails: {
    name: String,
    totalArea: Number,
    irrigatedArea: Number,
    soilType: String,
    waterSource: String,
    cropsGrown: [String]
  },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);

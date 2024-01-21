const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

// Use environment variable for MongoDB connection string
const dbURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/instaclone";

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Handle connection events
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the 'user' schema
const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profileImage: String,
  bio: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});

// Plugin passport-local-mongoose to the 'user' schema
userSchema.plugin(plm);

// Create the 'user' model
const User = mongoose.model("user", userSchema);

// Export the 'user' model
module.exports = User;

const mongoose = require('mongoose');

// Use environment variable for MongoDB connection string
const dbURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/instaclone";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// ... (rest of your code)

    const postSchema = mongoose.Schema({
        picture: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        caption: String,
        date: {
            type: Date,
            default: Date.now
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }
        ]
    });


    module.exports = mongoose.model("post", postSchema);

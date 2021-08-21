const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  text: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const Tweet = mongoose.model('Tweet', TweetSchema);

exports.Tweet = Tweet;

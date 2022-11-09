const mongoose = require('mongoose');

const ChatWatchlistSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movies: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = ChatWatchlist = mongoose.model(
  'chatWatchlist',
  ChatWatchlistSchema
);

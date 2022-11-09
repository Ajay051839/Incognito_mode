const mongoose = require('mongoose');

const PrivateWatchlistSchema = new mongoose.Schema({
  user: {
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

module.exports = PrivateWatchlist = mongoose.model(
  'privateWatchlist',
  PrivateWatchlistSchema
);

const mongoose = require('mongoose');

const GroupWatchlistSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'group',
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

module.exports = GroupWatchlist = mongoose.model(
  'groupWatchlist',
  GroupWatchlistSchema
);

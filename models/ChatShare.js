const mongoose = require('mongoose');

const ChatShareSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = ChatShare = mongoose.model('chatShare', ChatShareSchema);

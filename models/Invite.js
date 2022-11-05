const mongoose = require('mongoose');

const InviteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  member: {
    type: String,
    required: true,
  },
});

module.exports = Invite = mongoose.model('invite', InviteSchema);

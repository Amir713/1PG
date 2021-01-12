const { model } = require('mongoose');

module.exports = model('member', {
  userId: String,
  guildId: String,
  coins: { type: Number, default: 0 }
});

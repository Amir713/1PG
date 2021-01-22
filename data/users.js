const bot = require('../bot');
const guild = require('./models/guild');
const SavedUser = require('./models/user');

module.exports = new class {
  async get(id) {
    return await SavedUser.findById(id)
      || await new SavedUser({ _id: id }).save();
  }

  async getInGuild(guildId) {
    const guild = bot.guilds.cache.get(guildId);
    const ids = guild.members.cache.map(u => ({ _id: u.id }));

    return await SavedUser.find({ _id: ids });
  }
}

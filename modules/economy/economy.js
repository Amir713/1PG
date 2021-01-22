const users = require('../../data/users');
const bot = require('../../bot');

module.exports = new class {
  async rank(member) {
    const savedUsers = await users.getInGuild(member.guild.id);
    return savedUsers
      .sort((a, b) => (a.coins > b.coins) ? 1 : -1)
      .findIndex(m => m.id === member.id) + 1;
  }

  async leaderboard(guildId) {
    const savedUsers = await users.getInGuild(guildId);

    return savedUsers
      .sort((a, b) => (a.coins > b.coins) ? 1 : -1)
      .map((savedUser, index) => ({
        user: bot.users.cache.get(savedUser.id),
        savedUser,
        rank: index + 1
      }))
      .filter(({ user }) => !user.bot);
  }
  
  async checkToAddCoins(userId) {
    const savedUser = await users.get(userId);
    savedUser.coins += 5;
    return savedUser.save();
  }
}
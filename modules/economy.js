const members = require('../data/members');
const bot = require('../bot');

module.exports = new class {
  async rank(member) {
    const savedMembers = await members.getInGuild(member.guild.id);
    return savedMembers
      .sort((a, b) => (a.coins > b.coins) ? 1 : -1)
      .findIndex(m => m.userId === member.id) + 1;
  }

  async leaderboard(guildId) {
    const savedMembers = await members.getInGuild(guildId);
    const guild = bot.guilds.cache.get(guildId);

    return savedMembers
      .sort((a, b) => (a.coins > b.coins) ? 1 : -1)
      .filter(m => {
        const member = guild.members.cache.get(m.userId);
        return member && !member.user.bot;
      })
      .map((savedMember, index) => ({
        user: guild.members.cache.get(savedMember.userId).user,
        savedMember,
        rank: index + 1
      }));
  }
}
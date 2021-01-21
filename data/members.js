const SavedMember = require('./models/member');

module.exports = new class {
  async get(member) {
    const filter = {
      userId: member.user.id,
      guildId: member.guild.id
    };
    return await SavedMember.findOne(filter)
      || await new SavedMember(filter).save();
  }

  async getInGuild(guildId) {
    return await SavedMember.find({ guildId });
  }
}
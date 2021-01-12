const Event = require('./event');
const { handleCommand } = require('../command-handler');
const logs = require('../../data/logs');
const members = require('../../data/members');

module.exports = class extends Event {
  on = 'message';
  
  async invoke(msg) {
    if (msg.author.bot || !msg.member) return;

    const command = await handleCommand(msg);
    if (command)
      return await logs.add(msg.guild.id, 'commands');

    await logs.add(msg.guild.id, 'messages');

    const member = await members.get(msg.member);
    member.coins += 5;
    await member.save();
  }
}

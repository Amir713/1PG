const Event = require('./event');
const { handleCommand } = require('../command-handler');
const logs = require('../../data/logs');
const economy = require('../../modules/economy/economy');

module.exports = class extends Event {
  on = 'message';
  
  async invoke(msg) {
    if (msg.author.bot || !msg.member) return;

    const command = await handleCommand(msg);
    if (command)
      return await logs.add(msg.guild.id, 'commands');

    await logs.add(msg.guild.id, 'messages');
    await economy.checkToAddCoins(msg.author.id);
  }
}

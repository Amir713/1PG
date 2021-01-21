const Command = require('./command');
const { Rank } = require('canvacord');
const economy = require('../modules/economy');
const members = require('../data/members');

module.exports = class extends Command {
  name = 'profile';
  
  async execute(msg) {
    const savedMember = await members.get(msg.member);

    const buffer = await new Rank()
      .setAvatar(msg.author.displayAvatarURL({ format: 'png' }))
      .setCurrentXP(savedMember.coins)
      .setDiscriminator(msg.author.discriminator)
      .setProgressBar(['red', 'green'], 'GRADIENT')
      .setRequiredXP(100)
      .setRank(await economy.rank(msg.member))
      .setStatus(msg.author.presence.status)
      .setUsername(msg.author.username)
      .build();

    await msg.channel.send({
      files: [{ attachment: buffer, name: 'profile.png' }]
    });
  }
}

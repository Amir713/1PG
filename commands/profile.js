const Command = require('./command');
const { Rank, write } = require('canvacord');
const members = require('../data/members');

module.exports = class extends Command {
  name = 'profile';
  
  async execute(msg) {
    const member = await members.get(msg.member);

    const buffer = await new Rank()
      .setAvatar(msg.author.displayAvatarURL({ format: 'png' }))
      .setCurrentXP(member.coins)
      .setRequiredXP(100)
      .setStatus(msg.author.presence.status)
      .setProgressBar('#FFFFFF', 'COLOR')
      .setUsername(msg.author.username)
      .setDiscriminator(msg.author.discriminator)
      .build();

  await msg.channel.send({
    files: [{ attachment: buffer, name: 'profile.png' }]
  });
  }
}

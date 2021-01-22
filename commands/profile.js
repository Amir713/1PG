const Command = require('./command');
const { Rank } = require('canvacord');
const economy = require('../modules/economy/economy');
const shop = require('../modules/economy/shop');
const users = require('../data/users');

module.exports = class extends Command {
  name = 'profile';
  category = 'Economy';
  
  async execute(msg) {
    const { profile, coins } = await users.get(msg.author.id);
    const maxCoins = shop.reduce((total, item) => total + item.cost, 0);

    const buffer = await new Rank()
      .setAvatar(msg.author.displayAvatarURL({ format: 'png' }))
      .setBackground('IMAGE', profile.backgroundURL)
      .setCurrentXP(coins)
      .setDiscriminator(msg.author.discriminator)
      .setProgressBar(profile.colors.primary)
      .setProgressBarTrack(profile.colors.secondary)
      .setRequiredXP(maxCoins)
      .setLevel(1, 'LEVEL')
      .setLevelColor(profile.colors.secondary, profile.colors.primary)
      .setRank(await economy.rank(msg.member))
      .setRankColor(profile.colors.secondary, profile.colors.primary)
      .setStatus(msg.author.presence.status)
      .setUsername(msg.author.username)
      .build();

    await msg.channel.send({
      files: [{ attachment: buffer, name: 'profile.png' }]
    });
  }
}

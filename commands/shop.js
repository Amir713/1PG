const { MessageEmbed } = require('discord.js');
const users = require('../data/users');
const Command = require('./command');
const shop = require('../modules/economy/shop');
const guilds = require('../data/guilds');

module.exports = class extends Command {
  name = 'shop';
  category = 'Economy';
  
  async execute(msg) {
    const savedUser = await users.get(msg.author.id);
    const savedGuild = await guilds.get(msg.guild.id);

    const embed = new MessageEmbed()
      .setTitle('Profile Shop')
      .setDescription(`
        Unlock cool profile customizations with coins.
        \nType \`${savedGuild.general.prefix}buy [name]\` to buy an item.`.trim())
      .setThumbnail('https://cdn.pixabay.com/photo/2016/10/08/18/35/shopping-1724299_960_720.png')
      .setFooter(
        `Requested by ${msg.author.tag}                    💰 ${savedUser.coins} coins`,
        msg.author.displayAvatarURL({ dynamic: true })
      );

    for (const item of shop)
      embed.addField(
        item.name,
        `💰 **${item.cost}**\n${item.description}`,
        true);

    await msg.channel.send(embed);
  }
}

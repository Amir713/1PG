const Command = require('./command');
const shop = require('../modules/economy/shop');
const users = require('../data/users');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  name = 'buy';
  category = 'Economy';
  
  async execute(msg, ...args) {
    const savedUser = await users.get(msg.author.id);

    const name = args.join(' ').toLowerCase();
    const item = shop.find(i => i.name.toLowerCase() === name);
    if (!item)
      throw new TypeError('Item not found');  
    if (item.cost > savedUser.coins)
      throw new TypeError(`You need \`${item.cost - savedUser.coins}\` more coins to buy this`);

    savedUser.coins -= item.cost;
    savedUser.customizations.push(item.name);
    await savedUser.save();

    await msg.channel.send(new MessageEmbed()
      .setTitle('Item Bought')
      .addField('Item', item.name)
      .addField('Cost', `💰 ${item.cost} coins`)
      .addField('Coins Remaining', `💰 ${savedUser.coins}`)
    );
    await item.execute(savedUser);
  }
}

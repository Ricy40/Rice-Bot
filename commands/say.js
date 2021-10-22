const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

  let sayArray = message.content.split(" | ");
  let sayChannel = helpArray[0];
  let sayMessage = helpArray[1];
  let channel = client.channels.cache.find(channel => channel.name.toLowerCase() === sayChannel);

  if(channel)
    channel.send(sayMessage);

}

module.exports.config = {
  name: "say",
  description: "Makes the bot say something in the specified channel.",
  usage: "=say (channel) | (message)",
  accessableby: "Members",
  aliases: ['s']
}

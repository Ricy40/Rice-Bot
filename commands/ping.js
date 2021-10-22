const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

  return message.channel.send('pong');

}

module.exports.config = {
  name: "ping",
  description: "Pongs you",
  usage: "=ping",
  accessableby: "Members",
  aliases: []
}

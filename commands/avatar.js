const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

  return message.channel.send(message.author.displayAvatarURL());

}

module.exports.config = {
  name: "avatar",
  description: "Gives you a picture of your avatar",
  usage: "=avatar",
  accessableby: "Members",
  aliases: ['a']
}

const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const checkPermissionRole = (role) => role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || role.permissions.has('BAN_MEMBERS') || role.permissions.has('MANAGE_CHANNELS') || role.permissions.has('MUTE_MEMBERS') || role.permissions.has('MANAGE_GUILD')

module.exports.run = async (bot, message, args) => {

  let embedContent = args.split(" | ");
  let embedTitle = embedContent[0];
  let embedAuthor = embedContent[1];
  let embedDescription = embedContent[2];
  let embedColor = embedContent[3];
  let embedThumbnail = embedContent[4];
  let randColor = Math.floor(Math.random() * 999999) + 1;

  if (embedTitle === "") {
    embedTitle = "Title";
  }
  if (embedAuthor === "me") {
    embedAuthor = message.channel.author;
  }
  if (embedColor === "random") {
    embedColor = '#' + randColor;
  }

  message.channel.bulkDelete(1, true);

  let embed = new Discord.MessageEmbed()
    .setTitle(embedTitle)
    .setThumbnail(embedThumbnail)
    .setDescription(embedDescription)
    .setAuthor(embedAuthor)
    .setColor(embedColor)
  message.channel.send(embed);
}

module.exports.config = {
  name: "embed",
  description: "Creates an Embedded message.",
  usage: "=embed (Embed Title) | (Embed Author) | (Embed Description) | (Embed Colour hex value [use 'random' for random colour]) | (Embed Thumbnail URL)",
  accessableby: "Members",
  aliases: ['eb']
}

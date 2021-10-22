const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission(['ADMINISTRATOR'])) return;
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])

  let modRole = message.guild.roles.cache.get('789965686737731634');
  if(modRole) {
    member.roles.add(modRole);
    message.channel.send(`Congratulations! ${member}, you are now a moderator!`);
  }

}

module.exports.config = {
  name: "promotemod",
  description: "Promotes member specified to moderator.",
  usage: "=promotemod (member with @)",
  accessableby: "Moderators",
  aliases: ['pm']
}

const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission(['ADMINISTRATOR'])) return;
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])

    let adminRole = message.guild.roles.cache.get('785097376322027540');
    let modRole = message.guild.roles.cache.get('789965686737731634');
    if(adminRole) {
      member.roles.add(adminRole);
      member.roles.remove(modRole);
      message.channel.send(`Congratulations! ${member}, you are now an admin!`);
    }

}

module.exports.config = {
  name: "promoteadmin",
  description: "Promotes member specified to admin.",
  usage: "=promoteadmin (member with @)",
  accessableby: "Admins",
  aliases: ['pa']
}

const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission(['MUTE_MEMBERS'])) {
    message.channel.send("You don't have permission to use this command!");
    return;
  }
  if(!args){
    message.channel.send("Please specify a member with their @!");
  }
  try {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
    console.log("member");
    let mutedRole = message.guild.roles.cache.get('789961229543276614');

    if (member.id === message.author.id) {
      message.channel.send("You cannot mute yourself!");
      return;
    }
    if(mutedRole) {
      member.roles.remove(mutedRole);
      message.channel.send(`Unmuted ${member}.`);
    }
  }
  catch(err) {
    message.channel.send("Unable to find that member!");
    console.log(err);
  }

}

module.exports.config = {
  name: "unmute",
  description: "Unmutes member specified.",
  usage: "=unmute (member with @)",
  accessableby: "Moderators",
  aliases: ['um']
}

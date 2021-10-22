const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission('BAN_MEMBERS'))
    message.channel.send("You don't have permission to use that command.");
  else{
    let bannedMember = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
    if(bannedMember){
    try{
        console.log(bannedMember.tag + " was banned.");
        message.channel.send (`${bannedMember} has been banned from the server!`)
    }
    catch(err) {
      console.log(err);
    }
  }
}

}

module.exports.config = {
  name: "ban",
  description: "Bans member specified.",
  usage: "=ban (member with @)",
  accessableby: "Admins",
  aliases: ['b']
}

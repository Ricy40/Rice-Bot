const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission('BAN_MEMBERS'))
    message.channel.send("You don't have permission to use that command.");
  else{
    let bannedMember = await message.guild.members.unban(args);
    if(bannedMember){
    try{
        console.log(bannedMember.tag + " was unbanned.");
        message.channel.send (`${bannedMember} has been unbanned from the server!`)
    }
    catch(err) {
      console.log(err);
    }
  }
}

}

module.exports.config = {
  name: "unban",
  description: "Unbans member specified.",
  usage: "=unban (member ID)",
  accessableby: "Admins",
  aliases: ['ub']
}

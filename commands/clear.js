const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    let msg = await message.reply("Missing Permissions!");
    await msg.delete({ timeout: 3500 }).catch(err => console.log(err));
    return;
  }

  let deleteAmount;

  if(isNaN(args) || parseInt(args) <= 0) {
    let msg = await message.reply("This is not a number!");
    await msg.delete({ timeout: 3500 }).catch(err => console.log(err));
    return;
  }

  if(parseInt(args) > 100) {
    let msg = await message.reply("You can only delete 100 messages at a time!");
    await msg.delete({ timeout: 3500 }).catch(err => console.log(err));
    return;
  } else {
    deleteAmount = parseInt(args);
    try {
      message.channel.bulkDelete(deleteAmount + 1, true)
      let msg = await message.reply(`**Successfully** deleted ***${deleteAmount}*** Messages.`);
      await msg.delete({ timeout: 3500 }).catch(err => console.log(err));
    }
    catch(err) {
      message.reply(`Something went wrong... ${err}`);
    }
  }

}

module.exports.config = {
  name: "clear",
  description: "Clears messages",
  usage: "=clear (number to clear)",
  accessableby: "Moderators",
  aliases: ['c', 'purge']
}

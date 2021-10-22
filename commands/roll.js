const Discord = require("discord.js");
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

  let userArray = message.content.split(" ");
  let userArgs = userArray.slice(1);
  let sides = parseInt(userArgs[0]);

  if (sides < 21 && sides > 19) {
    let rollDice = Math.floor(Math.random() * 20) + 1;
    if (rollDice === 20) {
      message.reply("Rolled a " + rollDice + "! **Critical Success!**");
    }
    else if (rollDice === 1) {
      message.reply("Rolled a " + rollDice + "! **Critical Failure!**");
    }
    else {
      message.reply("Rolled a " + rollDice + "!");
    }
  }
  else {
    const rollDice = () => Math.floor(Math.random() * sides) + 1;
    message.reply("Rolled a " + rollDice() + "!");
  }

}

module.exports.config = {
  name: "roll",
  description: "Rolls a dice with the specified numbe rof sides, leave blank for 6.",
  usage: "=roll (sides on dice)",
  accessableby: "Members",
  aliases: ['d','dice']
}

const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  fs.readFile('./util/fart.txt', 'utf8', async (err, data) => {
    if (err) throw err;
    let jokesArray = data.split("\r\n");
    let arraySize = jokesArray.length - 1;
    let randomJoke = Math.floor(Math.random() * arraySize);
    let jokeSelected = jokesArray[randomJoke];
    message.channel.send(jokeSelected);
  });

}

module.exports.config = {
  name: "fart",
  description: "fards.",
  usage: "=fart",
  accessableby: "Members",
  aliases: ['fard', 'smelly', 'stinkcloud']
}

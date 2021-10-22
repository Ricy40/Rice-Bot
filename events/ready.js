const Discord = require("discord.js")
const database = require('../database/database');
const MessageModel = require('../database/models/message');

module.exports = (bot) => {
  console.log(`${bot.user.username} is online`)
  bot.user.setActivity("Ricy40's YT Videos", {type: "WATCHING"});

  database.then(() => console.log("Connected to MongoDB")).catch(err => console.log(err));
}

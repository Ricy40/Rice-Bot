const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
const database = require('./database/database');
const MessageModel = require('./database/models/message');
const cachedMessageReactions = new Map();
const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
var date = new Date();
const fs = require("fs");

require("./util/eventHandler")(bot)

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{

  if(err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0) {
    return console.log("[LOGS] Couldn't Find Commands!");
  }

  jsfile.forEach((f, i) => {
    let pull = require(`./commands/${f}`);
    bot.commands.set(pull.config.name, pull);
    pull.config.aliases.forEach(alias => {
      bot.aliases.set(alias, pull.config.name)
    });
  });
});

//EVENTS

bot.on("guildMemberAdd", member => {
  let roleToAdd = member.guild.roles.cache.find(roleToAdd => role.name.toLowerCase() === 'member');
  member.roles.add(roleToAdd);

  const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome')
  welcomeChannel.send (`Welcome ${member}!`)
})

bot.on("guildMemberRemove", member => {
  const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome')
  welcomeChannel.send (`Bye then ${member}.`)
})

bot.on("messageReactionAdd", async (reaction, user) => {
  if (!reaction.client === user.bot) {
    let { id } = reaction.message;
    let msgDocument = await MessageModel.findOne({ messageId: id })
    if (msgDocument) {
      let addMemberRole = (emojiRoleMappings) => {
        if(emojiRoleMappings.hasOwnProperty(reaction.emoji.id)) {
          let roleId = emojiRoleMappings[reaction.emoji.id];
          let role = reaction.message.guild.roles.cache.get(roleId);
          let member = reaction.message.guild.members.cache.get(user.id);
          if(role && member) {
            member.roles.add(role);
          }
        }
      }

      if (reaction.message.partial) {
        await reaction.message.fetch();
        try {
          if (msgDocument) {
            cachedMessageReactions.set(id, msgDocument.emojiRoleMappings);
            let { emojiRoleMappings } = msgDocument;
            addMemberRole(emojiRoleMappings);
          }
        }
        catch (err) {
          console.log(err);
        }
      }
      else {
        let emojiRoleMappings = cachedMessageReactions.get(reaction.message.id);
        addMemberRole(emojiRoleMappings);
      }
    }
  }
});

bot.on("messageReactionRemove", async (reaction, user) => {
  if (!reaction.client === user.bot) {
    let { id } = reaction.message;
    let msgDocument = await MessageModel.findOne({ messageId: id })
    if (msgDocument) {
      let removeMemberRole = (emojiRoleMappings) => {
        if(emojiRoleMappings.hasOwnProperty(reaction.emoji.id)) {
          let roleId = emojiRoleMappings[reaction.emoji.id];
          let role = reaction.message.guild.roles.cache.get(roleId);
          let member = reaction.message.guild.members.cache.get(user.id);
          if(role && member) {
            member.roles.remove(role);
          }
        }
      }

      if (reaction.message.partial) {
        await reaction.message.fetch();
        try {
          if (msgDocument) {
            cachedMessageReactions.set(id, msgDocument.emojiRoleMappings);
            let { emojiRoleMappings } = msgDocument;
            removeMemberRole(emojiRoleMappings);
          }
        }
        catch (err) {
          console.log(err);
        }
      }
      else {
        let emojiRoleMappings = cachedMessageReactions.get(reaction.message.id);
        removeMemberRole(emojiRoleMappings);
      }
    }
  }
});

bot.on("message", async message => {

  if (message.content.toLowerCase().includes("jojo")) {
    let time = date.getTime();
    fs.readFile('./util/time.txt', 'utf8', async (err, data) => {
      let timeArray = data.split("\r\n");
      let previousTime = timeArray[0];
      if (err) {
        throw err;
        console.log("No previous time found");
        return;
      }
      else {
        let timeToAllowAgain = parseInt(previousTime) + 150000;
        console.log(timeToAllowAgain);
        console.log(time);
        if (time <= timeToAllowAgain) {
          console.log("time not up yet");
          return;
        }
        else {
          message.channel.send("https://media.discordapp.net/attachments/382522257840275457/793137420249202738/rice.gif");
          let newTime = time.toString();
          console.log(newTime);
          fs.writeFile('./util/time.txt', newTime, (err) => {
            if (err) return console.log(err);
          });
        }
      }
    });
  }

  if(message.author.bot || message.channel.type === "dm") return;

  let prefix = botsettings.prefix;
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0];
  let args = message.content.substring(message.content.indexOf(' ')+1);

  if(!message.content.startsWith(prefix)) return;
  let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
  if(commandfile) commandfile.run(bot,message,args)

})

//Login using Discord Token
bot.login(botsettings.token);

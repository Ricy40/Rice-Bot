const Discord = require("discord.js");
const { MessageCollector } = require('discord.js');
const botconfig = require("../botsettings.json");
const MessageModel = require('../database/models/message');

let msgCollectorFilter= (newMsg, originalMsg) => newMsg.author.id === originalMsg.author.id;

module.exports.run = async (bot, message, args) => {

  let messageArray = args.split(/\s+/);
  let reactionMessageId = messageArray[0];
  let reactionType = messageArray[1];

  if (reactionType) {
    message.channel.send("Too many message IDs! Please provide only 1.")
    return;
  }

  if (!message.member.hasPermission('ADMINISTRATOR')) {
    message.channel.send("You do not have permission to use this command.")
    return;
  }
  else {
    try {
      let fetchedMessage = await message.channel.messages.fetch(reactionMessageId);
      if (fetchedMessage) {
        await message.channel.send("Please provide all of the emoji names with the role name, one by one, separated by a comma. \ne.g. ```gamer, gamer``` \n Where the emoji name comes first and the role name comes second.");
        let collector = new MessageCollector(message.channel, msgCollectorFilter.bind(null, message));
        let emojiRoleMappings = new Map();
        collector.on('collect', msg => {
          let { cache } = msg.guild.emojis;
          if (msg.content.toLowerCase() === '=done') {
            collector.stop('Done commands was issued.');
            return;
          }
          let [ emojiName, roleName ] = msg.content.split(new RegExp(/,\s+/));
          if (!emojiName && !roleName) return;
          let emoji = cache.find(emoji => emoji.name.toLowerCase() === emojiName.toLowerCase());
          if (!emoji) {
            msg.channel.send("Emoji does not exist. Try again.")
              .then(msg => msg.delete({ timeout : 2000 }))
              .catch(err => console.log(err));
            return;
          }
          let role = msg.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
          if(!role) {
            msg.channel.send("Role does not exist. Try again.")
              .then(msg => msg.delete({ timeout : 2000 }))
              .catch(err => console.log(err));
            return;
          }
          fetchedMessage.react(emoji)
            .then(emoji => console.log('Reacted.'))
            .catch(err => console.log(err));
          emojiRoleMappings.set(emoji.id, role.id);
        });
        collector.on('end', async (collected, reason) => {
          MessageModel.findOne({ $where: { messageId: fetchedMessage.id } });
          let findMsgDocument = await MessageModel.
            findOne({ messageId: fetchedMessage.id })
            .catch(err => console.log(err));
          if(findMsgDocument) {
            console.log("The message exists... Don't save...");
            message.channel.send("A role reaction setup exists for this message already.");
          }
          else {
            let dbMsgModel = new MessageModel({
              messageId: fetchedMessage.id,
              emojiRoleMappings: emojiRoleMappings
            });
            dbMsgModel.save()
              .then(m => console.log(m))
              .catch(err => console.log(err));
            message.channel.send("Roll reaction created successfully!");
          }
        });
      }
    }
    catch(err) {
      console.log(err);
      let msg = await message.channel.send("Invalid ID. Message was not found");
      await msg.delete({ timeout: 3500 }).catch(err => console.log(err));
    }
  }

}

module.exports.config = {
  name: "reactions",
  description: "Creates a reaction role.",
  usage: "=reactions (message ID)",
  accessableby: "Admins",
  aliases: ['reactionrole','rr']
}

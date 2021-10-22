const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

  let argsArray = args.split(" ");
  let time = argsArray[0];
  let regex = new RegExp(/^([0-9]{2}|[0-9{1}])[sSmMhH]$/);
  let question = argsArray.slice(1).join(" ");
  let randColor = Math.floor(Math.random() * 999999) + 1;

  const upvote = bot.emojis.cache.find(emoji => emoji.name.toLowerCase() === 'upvote');
  const downvote = bot.emojis.cache.find(emoji => emoji.name.toLowerCase() === 'downvote');

  if (regex.test(time)) {
    if (time.toLowerCase().endsWith('s')) {
      time = parseInt(time.substring(0, time.indexOf('s')));
      time *= 1000;
    } else if (time.toLowerCase().endsWith('m')) {
      time = parseInt(time.substring(0, time.indexOf('m')));
      time *= 60 * 1000;
    } else if (time.toLowerCase().endsWith('h')) {
      time = parseInt(time.substring(0, time.indexOf('h')));
      time *= 60 * 60 * 1000;
    }
    let pollAuthor = message.author.tag;
    const embed = new Discord.MessageEmbed()
      .setTitle(question)
      .setTimestamp()
      .setColor('#' + randColor)
      .setDescription(`React with ${upvote} or ${downvote}.`)
      .setAuthor(pollAuthor);
    try {
      const polls = new Map();
      const userVotes = new Map();
      let filter = (reaction, user) => {
        if(user.bot) return false;
        if([upvote.name, downvote.name].includes(reaction.emoji.name)) {
          if(polls.get(reaction.message.id).get(user.id)) {
            console.log("User already voted!");
            return false;
          }
          else {
            console.log("User did not vote yet.");
            userVotes.set(user.id, reaction.emoji.name);
            console.log(userVotes);
            return true;
          }
        }
      }
      let msg = await message.channel.send(embed);
      await msg.react(upvote);
      await msg.react(downvote);
      polls.set(msg.id, userVotes);
      let reactions = await msg.awaitReactions(filter, { time: time });
      let upVoteS = reactions.get(upvote.id);
      let downVoteS = reactions.get(downvote.id);
      let upVoteResults = 0, downVoteResults = 0;
      if (upVoteS)
        upVoteResults = upVoteS.users.cache.filter(u => !u.bot).size;
      if (downVoteS)
        downVoteResults = downVoteS.users.cache.filter(u => !u.bot).size;
      const resultsembed = new Discord.MessageEmbed()
        .setTitle(`Results`)
        .setDescription(`${upvote} - ${upVoteResults} votes\n\n${downvote} - ${downVoteResults}`)
        .setColor('#' + randColor)
        .setAuthor(`Poll '` + question + `' by ` + pollAuthor);
      await message.channel.send(resultsembed);
    }
    catch (err) {
      console.log(err);
    }

  }
}

module.exports.config = {
  name: "poll",
  description: "Creates a poll for people to vote on.",
  usage: "=poll (length [e.g. 10s or 10m]) (question)",
  accessableby: "Members",
  aliases: ['createpoll', 'vote', 'v']
}

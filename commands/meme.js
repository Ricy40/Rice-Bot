const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const { RandomReddit } = require('random-reddit')
const Reddit = require("@cxllm/reddit");

module.exports.run = (bot, message, args) => {

  let sub = 'memes'
  let randomSubreddit = Math.floor(Math.random() * 8);

  if (randomSubreddit === 0) {
    sub = "memes"
  }
  else if (randomSubreddit === 1) {
    sub = "dankmemes"
  }
  else if (randomSubreddit === 2) {
    sub = "AdviceAnimals"
  }
  else if (randomSubreddit === 3) {
    sub = "MemeEconomy"
  }
  else if (randomSubreddit === 4) {
    sub = "ComedyCemetery"
  }
  else if (randomSubreddit === 5) {
    sub = "PrequelMemes"
  }
  else if (randomSubreddit === 6) {
    sub = "terriblefacebookmemes"
  }
  else {
    sub = "shittymoviedetails"
  }

  (async (post) => {
    try {
      const reddit = await Reddit.random(sub)

      var embed = new Discord.MessageEmbed()
        .setAuthor("u/" + reddit.author)
        .setImage(reddit.image)
        .setTitle(reddit.title)
        .setColor('#FF5700')
        .setDescription("from r/" + reddit.subreddit)
       message.channel.send(embed);

    }
    catch {
      console.log("Subreddit does not exist")
    }
  })()

}

module.exports.config = {
  name: "meme",
  description: "Posts a meme.",
  usage: "=meme",
  accessableby: "Members",
  aliases: ['funny', 'laugh', 'haha']
}

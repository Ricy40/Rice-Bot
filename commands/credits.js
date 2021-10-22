const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

  const embed = new Discord.MessageEmbed()
    .setTitle('Rice Bot by Ricy40')
    .setURL('https://www.youtube.com/channel/UC-a4lDwaEv6gftAE9uVK64w?sub_confirmation=1')
    .setAuthor('Credits')
    .setDescription('This bot took many hours to produce. It has been tailored to the Cranbrook discord server for all server management purposes. Find me on all thewse various platforms:')
    .setColor('#009a9a')
    .setThumbnail('https://i.ibb.co/VgTfvv9/Logo.png')
    .setImage('https://i.ibb.co/8s7X039/Melodic-Desktop-Blurred.png')
    .setFooter('Coolest Kid on the Server.')
    .addFields(
      { name: 'Instagram (main)', value: 'https://www.instagram.com/ricyg3.0/', inline:true},
      { name: 'Instagram (fx)', value: 'https://www.instagram.com/ricy.fx/', inline:true},
      { name: 'Facebook', value: 'https://www.facebook.com/profile.php?id=100013645572331', inline:true},
      { name: 'Patreon', value: 'https://www.patreon.com/ricy40'},
      { name: 'Twitter', value: 'https://twitter.com/Ricy40'},
      { name: 'Youtube', value: 'https://www.youtube.com/channel/UC-a4lDwaEv6gftAE9uVK64w?sub_confirmation=1'},
    )
  message.channel.send(embed);

}

module.exports.config = {
  name: "credits",
  description: "Try it.",
  usage: "=credits",
  accessableby: "Members",
  aliases: []
}

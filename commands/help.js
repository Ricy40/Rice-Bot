const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

  let helpArray = message.content.split(" ");
  let helpArgs = helpArray.slice(1);

  //If no command specified
  if(!helpArgs[0]) {
    var embed = new Discord.MessageEmbed()
      .setAuthor(`Here are the available commands to use:`)
      .setThumbnail('https://cdn.discordapp.com/avatars/785196429726974022/db7a007e5a5c56e53fa4a41c01561b10.png?size=128')
      .setDescription('```addrole | avatar | ban | clear | credits | embed | fart | help | hi | joke | kick | memberinfo | meme | mute | ping | poll | promoteadmin | promotemod | reactions | removerole | roll | say | unban | unmute | weezer```')
      .addFields({ name: 'Prefix', value: '```=```', inline: true})
      .setColor('#404040')
     message.channel.send(embed);
  }

  //If command specified
  if(helpArgs[0]); {
    let command = helpArgs[0];

    if(bot.commands.has(command)) {

      command = bot.commands.get(command);
      var embed = new Discord.MessageEmbed()
        .setAuthor(`${command.config.name} Command`)
        .setDescription(`
        - **Command's Description** __${command.config.description || "There is no description for this command."}__
        - **Command's Usage** __${command.config.usage || "No Usage"}__
        - **Command's Permissions** __${command.config.accessableby || "Members"}__
        - **Command's Aliases** __${command.config.aliases || "No Aliases"}__
        `)
        .setThumbnail('https://cdn.discordapp.com/avatars/785196429726974022/db7a007e5a5c56e53fa4a41c01561b10.png?size=128')
        .setColor('#404040')
    message.channel.send(embed);
    }
  }

}

module.exports.config = {
  name: "help",
  description: "Gives information on command specified, if no command specified ir provides all commands available.",
  usage: "=help (command)",
  accessableby: "Members",
  aliases: ['h']
}

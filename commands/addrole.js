const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const checkPermissionRole = (role) => role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || role.permissions.has('BAN_MEMBERS') || role.permissions.has('MANAGE_CHANNELS') || role.permissions.has('MUTE_MEMBERS') || role.permissions.has('MANAGE_GUILD')

module.exports.run = async (bot, message, args) => {

  let roleNames = args.split(" | ");
  let roleSet = new Set(roleNames);
  let { cache } = message.guild.roles;

  roleSet.forEach(roleName => {
    let role = cache.find(role => role.name.toLowerCase() === roleName);
    if (role) {
      if (message.member.roles.cache.has(role.id)) {
        message.channel.send("You already have this role!");
        return;
      }
      if (checkPermissionRole(role)) {
        message.channel.send('You cannot add yourself to this role.');
      }
      else {
        message.member.roles.add(role)
          .then(member => message.channel.send("You were added to this role!"))
          .catch(err => {
            console.log(err);
            message.channel.send("Something went wrong.");
          });
      }
    }

    else{
      message.channel.send("Role not found!");
    }
  });

}

module.exports.config = {
  name: "addrole",
  description: "Adds roles to you.",
  usage: "=addrole (role 1) | (role 2 [if applicable])",
  accessableby: "Members",
  aliases: ['ar']
}

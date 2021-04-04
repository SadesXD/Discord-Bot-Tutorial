const discord = require("discord.js"); // import discord.js module

exports.run = async (client, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send("You don't have enought permission for using this command")
    // if user don't have ADMINISTRATOR permission, user can't using this command and will send the message
  }
  
  let user = message.mentions.users.first(); // Get user mentioned, and name it as the user
  if(!user) {
    return message.channel.send("Please mentions the user will you kick")
    // if the user doesn't mention will send the message
  }
  
  if(user.id === message.author.id) {
    // if mentioned user id equals to user id, will send the message
    return message.channel.send("You can't kick yourself")
  } else if(user.id === message.guild.owner.user.id) {
    // if mentioned user id equals to owner server user id, will send the message
    return message.channel.send("You can't kick owner of the server") 
  } else if(user.id === client.user.id) {
    // if mentioned user id equals to your bot id, will send the message
    return message.channel.send("You can't kick me :(")
  }
  
  let member = message.guild.members.cache.get(user.id); // Get member guild of mentioned user
  let reason = args.join(" ") || "No Reason"; // Provided the reason, if user doesn't provided any reason, the reason will be "No Reason"
  
  member
  .kick(reason)
  .then(() => {
    // If user success kick the mentioned user
    return message.channel.send(`You have been kick the user: ${user.tag} for the reason: ${reason}`);
  })
  .catch(() => {
    // If your bot dont have enought permission / your bot roles permission is under than mentioned user role permission, will send this message
    return message.channel.send("I don't have enought permission for kick this user")
  })
}

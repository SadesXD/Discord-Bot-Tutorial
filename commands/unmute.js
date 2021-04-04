const discord = require("discord.js");

exports.run = async (client, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send("You don't have enought permission for using this command");
    // if user don't have ADMINISTRATOR permission, user can't using this command and will send the message
  }
  
  let user = message.mentions.users.first(); // Get user mentioned, and name it as the user
  if(!user) {
    return message.channel.send("Please mentions the user will you unmute");
    // if the user doesn't mention will send the message
  }
  
  let reason = args.join(" ") || "No Reason"; // Provided the reason, if user doesn't provided any reason, the reason will be "No Reason"
  
  if(user.id === client.user.id) {
    // if mentioned user id equals to your bot id, will send the message
    return message.channel.send("You can't unmute me :(")
  } else if(user.id === message.guild.owner.user.id) {
     // if mentioned user id equals to owner server user id, will send the message
    return message.channel.send("You can't unmute owner of the server")
  } else if(user.id === message.author.id) {
    // if mentioned user id equals to user id, will send the message
    return message.channel.send("You can't unmute yourself")
  }
  
  let muteRole = message.guild.roles.cache.find(x => x.name === "Muted"); // find server role name "Muted"
  if(!muteRole) {
     // if muted role doesn't exist in the server
    return message.channel.send("Muted role doesn't exist in this server, Please create one first !")
  }
  
  let member = message.guild.members.cache.get(user.id); // Get member guild of mentioned user
  
  // Check if user isn't muted
  if(!member.roles.cache.has(muteRole.id)) {
    return message.channel.send("The user isn't muted")
  }
  
   // remove muted role into mentioned user
  member.roles.remove(muteRole.id, reason)
  .then(() => {
    return message.channel.send(`User: ${user.tag} has been unmuted for the reason: ${reason}`)
  })
  .catch(() => {
    return message.channel.send(`I don't have enought permission for unmute this person`)
  })
  
}

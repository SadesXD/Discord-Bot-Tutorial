const discord = require("discord.js");

exports.run = async (client, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send("You don't have enought permission for using this command");
    // if user don't have ADMINISTRATOR permission, user can't using this command and will send the message
  }
  
  let user = message.mentions.users.first(); // Get user mentioned, and name it as the user
  if(!user) {
    return message.channel.send("Please mentions the user will you mute");
    // if the user doesn't mention will send the message
  }
  
  let reason = args.join(" ") || "No Reason"; // Provided the reason, if user doesn't provided any reason, the reason will be "No Reason"
  
  if(user.id === client.user.id) {
    // if mentioned user id equals to your bot id, will send the message
    return message.channel.send("You can't mute me :(")
  } else if(user.id === message.guild.owner.user.id) {
     // if mentioned user id equals to owner server user id, will send the message
    return message.channel.send("You can't mute owner of the server")
  } else if(user.id === message.author.id) {
    // if mentioned user id equals to user id, will send the message
    return message.channel.send("You can't mute yourself")
  }
  
  let muteRole = message.guild.roles.cache.find(x => x.name === "Muted"); // find server role name "Muted"
  if(!muteRole) {
    // if muted role doesn't exist in the server
    return message.channel.send("Muted role doesn't exist in this server, Please create one first !")
  }
  
  let member = message.guild.members.cache.get(user.id); // Get member guild of mentioned user
  
  // Settint muted role, if muted role don't have permission in the server
  message.guild.channels.cache.forEach(x => {
    x.createOverwrite(muteRole, {
      SEND_MESSAGES: false
    }).catch(() => {
      return console.log(`I dont have permission for setup muted role permission in server: ${message.guild.name}`)
    })
  })
  
  // Check if user already muted
  if(member.roles.cache.has(muteRole.id)) {
    return message.channel.send("The user already muted")
  }
  
  // add muted role into mentioned user
  member.roles.add(muteRole.id, reason)
  .then(() => {
    // if success
    return message.channel.send(`User: ${user.tag} has been muted for the reason: ${reason}`)
  })
  .catch(() => {
    // if has something error
    return message.channel.send(`I don't have enought permission for mute this person`)
  })
  
}

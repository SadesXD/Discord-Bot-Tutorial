const discord = require("discord.js");

exports.run = async(client, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send("You don't have enought permission for using this command");
  }
  
  let user = message.mentions.users.first()
  if(!user) {
    return message.channel.send("Please provide the user will you ban")
  }
  
  if(user.id === message.author.id) {
    return message.channel.send("You can't ban yourself");
  } else if(user.id === message.guild.owner.user.id) {
    return message.channel.send("You can't ban owner of the server");
  } else if(user.id === client.user.id) {
    return message.channel.send("You can't ban me :(");
  }

  let reason = args.slice(1).join(" ") || "No Reason";
  let member = message.guild.members.cache.get(user.id)
  
  member
  .ban(user, {reason: reason})
  .then(() => {
    return message.channel.send(`You have been ban the user: ${user.tag}, for the reason: ${reason}, userID: ${user.id}`)
  })
  .catch(() => {
    return message.channel.send("I don't have enought permission for ban this user");
  })
}

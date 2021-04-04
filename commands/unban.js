const discord = require("discord.js");

exports.run = async (client, message, args) => {
  
  let user = args[0];
  if(!user) {
    return message.channel.send("Please provide the user id will you unban");
  }
  
  if(user === message.author.id) {
    return message.channel.send("You can't unban yourself");
  } else if(user === message.guild.owner.user.id) {
    return message.channel.send("You can't unban owner of the server");
  } else if(user === client.user.id) {
    return message.channel.send("You can't unban me :(");
  }
  
  let reason = args.slice(1).join(" ") || "No Reason";
  let userUnban = client.users.cache.get(user);
  
  message.guild.members
  .unban(user, {reason: reason})
  .then(() => {
    return message.channel.send(`You have been unban the user: ${userUnban.tag}, for the reason: ${reason}`)
  })
  .catch(() => {
    return message.channel.send("i can't find the user provided !");
  })
}

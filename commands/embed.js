const discord = require("discord.js")

exports.run = (client, message, args) => {
  
  const embed = new discord.MessageEmbed()
  .setAuthor("embed chat")
  .setColor("RANDOM") // this will set color as random or you can use hex color code 
  .setDescription("embed chat")
  .addField("embed","tutorial discord.js")
  .addField("embed","tutorial discord.js")
  .setFooter("embed tutorial")
  .setTimestamp()
  message.channel.send(embed); // more information about embed you can see in discord.js documents :)
}

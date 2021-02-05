const discord = require("discord.js")
const ms = require("ms")

exports.run = async(client, message, args) => {
  
  
  let time = args[0]
  if(!time)return message.reply("how minutes / hours will you set your alarm")
  if(ms(time) > ms("1d"))return message.reply("you can't set your alarm bigger than 1 day")
  // Im make it 1 day because sometime your bot will restart
  // And if your bot is restart , your alarm will gone / auto ended
  
  let reason = args.slice(1).join(' ')
  if(!reason)return message.reply("please give some reason")
  
  const embed = new discord.MessageEmbed()
  .setAuthor(`${message.author.tag} Alarm`,message.author.displayAvatarURL())
  .setColor("RANDOM")
  .setDescription(`Time: \`${time}\`\nReason: \`${reason}\``)
  .setTimestamp()
  message.channel.send(embed)
  
  setTimeout(() => {
    const embed = new discord.MessageEmbed()
  .setAuthor(`${message.author.tag} Your alarm has been ended`,message.author.displayAvatarURL())
  .setColor("RANDOM")
  .setDescription(`Time: \`${time}\`\nReason: \`${reason}\`\nAlarm seted in server: \`${message.guild.name}\``)
  .setTimestamp()
  message.author.send(embed)
  }, ms(time))
  
  // You Can modified the command whatever you want 
}

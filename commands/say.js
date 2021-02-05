const discord = require("discord.js")

exports.run = (client, message, args) => {
  
  let sy = args.join(' ')
  if(!sy)return message.channel.send(`${message.author} Please give me some message`)
  message.delete()
  message.channel.send(sy)
}

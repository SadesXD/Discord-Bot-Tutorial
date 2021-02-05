const discord = require("discord.js")

exports.run = (client, message, args) => {
  
  let cr = args[0]
  if(!cr)return message.reply("How many message will you clear ??")
  if(isNaN(cr))return message.reply("Argument is not number")
  if(cr > 100)return message.reply("You can't clear message up than 100 message")
  if(cr < 1)return message.reply("You can't clear message under 1 message")
  
  message.channel.bulkDelete(cr)
  message.channel.send(`${message.author} has been clear ${cr} message`).then(m => {
    m.delete({timeout: 3000})
  })
}

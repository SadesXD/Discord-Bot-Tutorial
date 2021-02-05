const db = require("quick.db")
const discord = require("discord.js")

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")){
    return message.channel.send("You don't have enough permission for use this command")
  }
  
  let option = args[0]
  if(!option){
    const embed = new discord.MessageEmbed()
    .setAuthor("Anti alt system option")
    .setColor("RANDOM")
    .setDescription("Type `on` for enabled anti alt\nType `off` for disabled anti alt")
    .setTimestamp()
    return message.channel.send(embed)
  }
  
  let logs = message.mentions.channels.first()
  let database = db.get(`antialt.${message.guild.id}`)
  
  if(option.toLowerCase() === "on"){
    if(database){
      return message.channel.send("This server already set anti alt system");
    }
    let days = args[2]
    if(!logs){
      return message.channel.send("Please mention the channels will you set as anti alt logs")
    }
    if(!days){
      return message.channel.send("How many days age will you allow for a new member to join your server ???")
    }
    if(isNaN(days)){
      return message.channel.send("Days option must be a number")
    }
    
    db.set(`antialt.${message.guild.id}`, logs.id)
    db.set(`altdays.${message.guild.id}`, days)
    const embed = new discord.MessageEmbed()
    .setAuthor("Anti alt enabled")
    .setColor("RANDOM")
    .setDescription(`${message.author.tag} has been enabled anti alt system`)
    .setTimestamp()
    return message.channel.send(embed)
  }else if(option.toLowerCase() === "off"){
    if(!database){
      return message.channel.send("This server isn't set anti alt system");
    }
    db.delete(`antialt.${message.guild.id}`)
    db.delete(`altdays.${message.guild.id}`)
    
    const embed = new discord.MessageEmbed()
    .setAuthor("Anti alt disabled")
    .setColor("RANDOM")
    .setDescription(`${message.author.tag} has been disabled anti alt system`)
    .setTimestamp()
    return message.channel.send(embed)
  }
  
}

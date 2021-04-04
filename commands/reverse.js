const discord = require("discord.js");

exports.run = async (client, message, args) => {
  
  let text = args.join(" ");
  if(!text) {
    return message.channel.send("Please give some text will you reverse !");
  }
  
  let reverse = text.split("").reverse().join("");
  let response = "**" + message.author.tag + ":** " + reverse;
  
  return message.channel.send(response)
  // Done lets test reverse command
}

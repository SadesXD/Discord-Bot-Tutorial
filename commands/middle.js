const discord = require("discord.js");

exports.run = async (client, message, args) => {
  
  let text = args.join(" ");
  if(!text) {
    return message.channel.send("Please provide some text will you want to take the middle letter of the text");
  }
  
  // function for getting the middle text of some words
  function getMiddle(character) {
    if(character.length == 2) {
      return character[0];
    } else if(character.length % 2 == 0) {
      return character[Math.floor(character.length / 2 - 1)] + character[Math.floor(character.length / 2)];
    } else if (character.length == 1) {
      return character[0];
    } else {
      return character[Math.floor(character.length / 2)];
    }
  }
  
  // call the function
  let middle = getMiddle(text);
  
  // Create an embed message
  const embed = new discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setColor("RANDOM")
  .addField("User Text: ", text, true)
  .addField("Middle of the text: ", middle, true)
  .setTimestamp()
  return message.channel.send(embed);
}

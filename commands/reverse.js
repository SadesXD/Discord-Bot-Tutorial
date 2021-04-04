const discord = require("discord.js");

exports.run = async (client, message, args) => {
  
  let text = args.join(" "); // Get all argument from the user
  if(!text) {
    return message.channel.send("Please give some text will you reverse !");
  }
  

  let reverse = text.split("").reverse().join("");
  /* 
   This is how to explain reverse variable, example text variable is: "hello world"
    -> so first we will split the text one by one: text.split(''), the result will be like = ['h','e','l','l','o',' ','w','o','r','l','d']
    -> then we will reverse the text: .reverse(), the result will be like this: ['d','l','r','o','w',' ','o','l','l','e','h']
    -> then we will combine all the arrays: .join(''), so the final result will be like this: "dlrow olleh"
  */
  let response = "**" + message.author.tag + ":** " + reverse; // result: **SadesXD#3971**: [reverse text]
  
  return message.channel.send(response)// Send the message
}

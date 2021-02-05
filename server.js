const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config.json");
const prefix = config.prefix;
const channelLogs = config.logs;
const db = require("quick.db");
const alt = require("discord-anti-alt");

// Ready Event
client.on("ready", async () => {
  client.user.setActivity("Tutorial discord bot",{
    type:"WATCHING" // You can make it WATCHING,LISTENING, PLAYING AND STREAMING (note: use capital words)
  })
  console.log("Bot Is Ready") 
});

// Message Event
client.on("message", async message => { 
  
  if(message.channel.type == "dm")return; // If Someone using your bot in dm, thats will return it
  if(message.author.bot)return; // If Someone using your bot, but they are bots, thats will return it
  if(message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`){
    message.channel.send(`${message.author} My Prefix is ${prefix}`);
  }
  
  if(!message.content.startsWith(prefix))return; // If Someone sending a message but the message is not starts with your bot prefix, thats will return it
   
  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();
  if(!cmd)return;
  
  try{
    delete require.cache[require.resolve(`./commands/${cmd}.js`)];
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args);
  }catch(e){
    console.log(e);
  }finally{
    client.channels.cache.get(channelLogs).send(`${message.author.tag} Using Commands: ${cmd}, In Server: ${message.guild.name}`);
  }
})  

client.on('guildMemberAdd', async member => {
  const altdays = db.get(`altdays.${member.guild.id}`);
  const altchannel = db.get(`antialt.${member.guild.id}`);
  if(!altdays || !altchannel)return;
  
  const account = new alt.config({
    days:parseInt(altdays),
    options:'kick'
  }); //so if alt account user join your server, the user will got kick
  
  let running = account.run(member);
  let profile = alt.profile(member);
  if(running){
    const embed = new discord.MessageEmbed()
    .setAuthor(member.user.tag,member.user.displayAvatarURL())
    .setColor("RANDOM")
    .addField("Account Age: ",profile.userAge,true)
    .addField("Age Requirement: ",altdays,true)
    .addField("Account Created",profile.date.userDateCreated,true)
    .setTimestamp()
    return member.guild.channels.cache.get(altchannel).send(embed);
  }
  
})

client.login(process.env.token)

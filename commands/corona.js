const discord = require("discord.js");
const novelcovid = require("novelcovid");

exports.run = async(client, message, args) => {
  
  let text = args.join(' ')
  if(!text){
    let corona = await novelcovid.all()
    
    const embed = new discord.MessageEmbed()
    .setAuthor("Global Covid-19 Status")
    .setColor("RANDOM")
    .addField("Total Cases",corona.cases.toLocaleString(),true)
    .addField("Total Deaths",corona.deaths.toLocaleString(),true)
    .addField("Total Recovered",corona.recovered.toLocaleString(),true)
    .addField("Today Cases",corona.todayCases.toLocaleString(),true)
    .addField("Today Deaths",corona.todayDeaths.toLocaleString(),true)
    .addField("Today Recovered",corona.todayRecovered.toLocaleString(),true)
    .addField("Active Cases",corona.active.toLocaleString(),true)
    .addField("Critical Cases",corona.critical.toLocaleString(),true)
    .addField("Updates",corona.updated.toLocaleString(),true)
    .setFooter("Stay Safe")
    .setTimestamp()
    message.channel.send(embed)
  }else{
    let corona = await novelcovid.countries({country: args.join(' ')})
    
    if(corona.country === undefined)return message.channel.send(`${message.author} I Can't Find Country Called: **${args.join(' ')}**`)
    
    const embed = new discord.MessageEmbed()
    .setAuthor(`${corona.country}[${corona.iso2}]`,corona.countryInfo.flag)
    .setThumbnail(corona.countryInfo.flag)
    .setColor("RANDOM")
    .addField("Total Cases",corona.cases.toLocaleString(),true)
    .addField("Total Deaths",corona.deaths.toLocaleString(),true)
    .addField("Total Recovered",corona.recovered.toLocaleString(),true)
    .addField("Today Cases",corona.todayCases.toLocaleString(),true)
    .addField("Today Deaths",corona.todayDeaths.toLocaleString(),true)
    .addField("Today Recovered",corona.todayRecovered.toLocaleString(),true)
    .addField("Active Cases",corona.active.toLocaleString(),true)
    .addField("Critical Cases",corona.critical.toLocaleString(),true)
    .addField("Updates",corona.updated.toLocaleString(),true)
    .setFooter("Stay Safe")
    .setTimestamp()
    message.channel.send(embed)
  }
}

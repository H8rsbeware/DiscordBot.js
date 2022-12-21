const fetch = require('node-fetch');
const Discord = require('discord.js')

module.exports = async function (msg, argue){
    let city = "London"
    
    if (argue.length>0){city = argue.join(" ");}

    try{
        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OWKEY}`
        let weatherRep = await fetch(weatherUrl);
        let json = await weatherRep.json();
        
        let main = (json.weather[0].main);
        let det = (json.weather[0].description);
        let temp = Math.round(((json.main.temp)-273.15));
        let feeltemp = Math.round(((json.main.feels_like)-273.15));
        let humidity = (json.main.humidity + "%");
        let country = (json.sys.country);
        let wind = (`Wind Speed: ${json.wind.speed}m/s \nDirection: ${json.wind.deg}`);
        
        const OWEmbed = new Discord.MessageEmbed()
            .setColor(`${process.env.ReturnColour}`)
            .setTitle("Weather for " + city)
            .setDescription(`Weather: ${main} (${det}) \nTemprature: ${temp}\u00B0C (feels ${feeltemp}\u00B0C) \nHumidity: ${humidity} \n${wind}\u00B0`)
            .setFooter(`Courtsey of Open Weather | ${city}, ${country}.`)
        msg.channel.send(OWEmbed);    
    }catch{
        const errorEmbed = new Discord.MessageEmbed()
            .setColor(`${process.env.ErrorColour}`)
            .setTitle("API Error")
            .setDescription("Invalid City or Unavaliable at this Time")
            .setFooter("This Error has been logged")
        msg.channel.send(errorEmbed);
  
    }
}

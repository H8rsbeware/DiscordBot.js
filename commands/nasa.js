const fetch = require('node-fetch');
const Discord = require('discord.js')

module.exports = async function(msg, argue){
    try{
        let term = "no term"
        if (argue.length>0){term = argue.join(" ");}

        if (term == "Mars" || term == "mars"){
            let nasa = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=50&camera=fhaz&api_key=${process.env.NASAKEY}`
            let nasaRep = await fetch(nasa);
            let json = await nasaRep.json();
            const i = Math.floor(Math.random()*json.photos.length)
            
            let image = json.photos[i].img_src
            let rover = json.photos[i].rover.name
            let state = json.photos[i].rover.status
            let date = json.photos[i].earth_date

            const marsEmbed = new Discord.MessageEmbed()
                .setColor(`${process.env.ReturnColour}`)
                .setTitle(`${rover}(${state}) | ${date}`)
                .setFooter("Courtsey of NASA")
                .setImage(image)
            msg.channel.send(marsEmbed); 

        }else if(term == "weather" || term == "Weather"){
            let nasa = `https://mars.nasa.gov/layout/embed/image/mslweather/`
            const nwEmbed = new Discord.MessageEmbed()
                .setColor(`${process.env.ReturnColour}`)
                .setDescription(nasa)
                .attachFiles(["../H8 bot/commands/assets/qrcode_mars.nasa.gov.png"])
                .setImage("attachment://qrcode_mars.nasa.gov.png")
                .setTitle("Mars Weather | Curiosity")
                .setFooter("Courtsey of NASA")    
            msg.channel.send(nwEmbed);            

        }else if(term == "Earth" || term == "earth" || term == "EPIC" || term == "epic"){
            let nasa = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.NASAKEY}`
            let nasaRep = await fetch(nasa)
            let json = await nasaRep.json()
            const i = Math.floor(Math.random()*json.length)
            
            let date = json[i].date
            let caption = json[i].caption 
            let image = `https://epic.gsfc.nasa.gov/archive/natural/2021/02/02/jpg/${json[i].image}.jpg` 

            const epicEmbed = new Discord.MessageEmbed()
                .setColor(`${process.env.ReturnColour}`)
                .setTitle("NASA | EPIC | "+ date)
                .setFooter(caption)
                .setImage(image)
            msg.channel.send(epicEmbed);

        }else if(term == "no term"){
            let nasa = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASAKEY}`;
            let nasaRep = await fetch(nasa);
            let json = await nasaRep.json();

            let date = (json.date);
            let explain = (json.explanation);
            let image = (json.hdurl);
            let title = (json.title);

            const nasaEmbed = new Discord.MessageEmbed()
                .setColor(`${process.env.ReturnColour}`)
                .setDescription(explain)
                .setTitle(`${title} | ${date}`)
                .setFooter("Courtsey of NASA")
                .setImage(image)
            msg.channel.send(nasaEmbed);
        }


    }catch{
        const errorEmbed = new Discord.MessageEmbed()
            .setColor(`${process.env.ErrorColour}`)
            .setTitle("API Error")
            .setDescription("Unknown Error Occured")
            .setFooter("This Error has been logged")
        msg.channel.send(errorEmbed);
    }
}        


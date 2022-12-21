const fetch = require("node-fetch");
const Discord = require("discord.js")

module.exports = async function(msg, argue){
    const country = argue.join(" ") 
        if(argue[0] === "all" || !argue[0]){
            fetch('https://covid19.mathdro.id/api').then(json => json.json()).then(data =>{
                let confirmed = data.confirmed.value.toLocaleString(); 
                let recovered = data.recovered.value.toLocaleString();
                let death = data.deaths.value.toLocaleString();
                let update = data.lastUpdate.toLocaleString();
                let date = update.split("T")

                const covidEmbed = new Discord.MessageEmbed()
                    .setColor(process.env.ReturnColour)
                    .setTitle("Worldwide Covid Information")
                    .addField("Confirmed Cases:", confirmed)
                    .addField("Confirmed Recoveries:", recovered)
                    .addField("Deaths:", death)
                    .setFooter(`Last updated: ${date[0]} • Courtsey of covid19.mathdro.id`)
                msg.channel.send(covidEmbed);
            })
        }else{
            fetch(`https://covid19.mathdro.id/api/countries/${country}`).then(json => json.json()).then(data =>{
                let confirmed = data.confirmed.value.toLocaleString(); 
                let recovered = data.recovered.value.toLocaleString();
                let death = data.deaths.value.toLocaleString();
                let update = data.lastUpdate.toLocaleString();
                let date = update.split("T")

                const covidEmbed = new Discord.MessageEmbed()
                    .setColor(process.env.ReturnColour)
                    .setTitle(`${country} | Covid Information`)
                    .addField("Confirmed Cases:", confirmed)
                    .addField("Confirmed Recoveries:", recovered)
                    .addField("Deaths:", death)
                    .setFooter(`Last updated: ${date[0]} • Courtsey of covid19.mathdro.id`)
                msg.channel.send(covidEmbed);
            }).catch(err =>{
                const validEmbed = new Discord.MessageEmbed()
                    .setColor(process.env.ErrorColour)
                    .setDescription("Invalid Country, do >countries to see all")
                msg.channel.send(validEmbed)
        })
    }
}
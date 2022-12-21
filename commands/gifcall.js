const fetch = require('node-fetch');
const Discord = require('discord.js')

module.exports = async function (msg, argue){

    let term = 'haters'; //Default
    if (argue.length > 0){term = argue.join(" ");} //Added term

    let tenorUrl = `https://api.tenor.com/v1/search?q=${term}&key=${process.env.TENORTOKEN}&contentfilter=high`; //Formatting URL

    let gifRep = await fetch(tenorUrl); //Fetching gif
    let json = await gifRep.json(); //Putting gifs in array

    const tenorGifRep = Math.floor(Math.random()*json.results.length); //Selecting a random one from searches

    /*
    const gifEmbed = new Discord.MessageEmbed()
        .setColor(`${process.env.ReturnColour}`);
        .setImage(json.results[tenorGifRep].url)
        .setFooter('Courtsey of Tenor: ' + term)
    msg.channel.send(gifEmbed);
    */
    
    msg.channel.send(json.results[tenorGifRep].url); //Sending the gif
    msg.channel.send("Courtsey of Tenor: " + term);
    

};
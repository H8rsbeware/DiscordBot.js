const Discord = require('discord.js');

const gif = require("./commands/gifcall.js");
const hate = require("./commands/hate.js");
const shark = require("./commands/shark.js");
const twitter = require("./commands/twitter.js");
const tweet = require("./commands/tweet.js");
const help = require("./commands/help.js");
const latest = require("./commands/latest.js");
const weather = require("./commands/weather.js");
const vote = require("./commands/2waypoll.js")
const nasa = require("./commands/nasa.js");
const slots = require("./commands/slots.js")
const kick = require("./commands/kick.js")
const ban = require("./commands/ban.js")
const who = require("./commands/whoAsked.js")
const avatar = require("./commands/avatar.js")
const mute = require("./commands/mute.js")
const unmute = require("./commands/unmute.js")
const clear = require("./commands/clear.js")
const covid = require("./commands/covid.js")
const countries = require("./commands/countries.js")
const roll = require("./commands/dice.js")
const flip = require("./commands/coin.js")
const wallet = require("./commands/wallet.js")


const commands = {flip,roll,countries,covid,clear,unmute,mute,avatar,who,ban,kick,slots,nasa,hate,gif,shark,twitter,tweet,help,latest,weather,vote,wallet};

module.exports =async (msg)=>{
    let token = msg.content.split(' ');
    let command = token.shift();
    try{
        if (command.charAt(0)=== ">"){
            command = command.substring(1);
            commands[command](msg, token); //function name (commands) in the object command, with the arguement, token.
        }
    }catch(err){
        const notValid = new Discord.MessageEmbed()
            .setColor(`${process.env.ErrorColour}`)
            .setDescription(command + " is not a valid command, for all commands, do '>help'!")
        msg.channel.send(notValid);
        console.log(err)
    }
};
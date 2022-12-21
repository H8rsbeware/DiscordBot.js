//Wake up message
console.log("Im waking up");

// Init dependencies
require("dotenv").config();

const Discord = require('discord.js');
const client = new Discord.Client();



//Auth success message
client.on('ready',readyDiscord = () =>{console.log('Ready to get to work!')});

client.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.cache.find((ch) => ch.name === "welcome-log");
    if(!channel) return;
    channel.send(`Welcome ${member}, Enjoy your stay!`)
});

const commandHandler = require('./commands');
client.on("message", commandHandler)

//Auth login
client.login(process.env.H8TOKEN);


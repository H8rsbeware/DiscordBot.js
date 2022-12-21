
const { MessageAttachment } = require('discord.js')
const fs = require('fs')

module.exports = function(msg){
    const store =fs.readFileSync('../H8 bot/commands/assets/who asked.txt');
    const attach = new MessageAttachment(store, 'who asked.txt');
    msg.channel.send(`${msg.author},  here is who asked!`, attach);
}
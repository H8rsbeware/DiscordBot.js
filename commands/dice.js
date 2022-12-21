const Discord = require("discord.js")

module.exports = function(msg, argue){
    
    let roll = Math.ceil(Math.random()*6)


    let rollImg = `../H8 bot/commands/assets/Dice face/roll${roll}.png`

    const rollEmbed = new Discord.MessageEmbed()
        .setColor(process.env.ReturnColour)
        .setTitle(`${msg.author.username} | Dice Roll`)
        .attachFiles([rollImg])
        .setImage(`attachment://roll${roll}.png`)
    msg.channel.send(rollEmbed)
}
const Discord = require("discord.js")

module.exports = function(msg, argue){
    
    let flip = Math.floor(Math.random()*2)+1;
    console.log(flip)


    let coinImg = `../H8 bot/commands/assets/Coin Flip/coin${flip}.png`

    const flipEmbed = new Discord.MessageEmbed()
        .setColor(process.env.ReturnColour)
        .setTitle(`${msg.author.username} | Coin flip`)
        .attachFiles([coinImg])
        .setImage(`attachment://coin${flip}.png`)
    msg.channel.send(flipEmbed)
}
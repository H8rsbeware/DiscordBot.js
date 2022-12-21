const Discord = require('discord.js')

module.exports = function (msg, argue) {
    let topic = argue.join(" ");
    let username = msg.member.user.username

    const pollEmbed = new Discord.MessageEmbed()
        .setColor(`${process.env.ReturnColour}`)
        .setTitle("Poll started by " + username)
        .setDescription(topic)
    msg.channel.send({
        embed: pollEmbed
    }).then(embedMessage => {
        embedMessage.react('👍').then(() => embedMessage.react('👎'));
    });
}
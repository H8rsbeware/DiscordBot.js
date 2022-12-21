const Discord = require("discord.js");

module.exports = function (msg, argue){
    try{
        const user = msg.mentions.users.first() || msg.author;

        let username; 
        if(user.username.length > 8){
            username = (user.username.substring(0, 7) + "...");
        }else{
            username = user.username;
        }

        const avEmbed = new Discord.MessageEmbed()
            .setColor(`${process.env.ReturnColour}`)
            .setImage(user.displayAvatarURL())
            .setTitle(`Avatar of ${username}`)
        msg.channel.send(avEmbed);
        
    }catch(err){
        const errorEmbed = new Discord.MessageEmbed()
            .setColor(`${process.env.ErrorColour}`)
            .setDescription("Unable to get Avatar")
        msg.channel.send(errorEmbed)
        console.log(err);        
    }
}
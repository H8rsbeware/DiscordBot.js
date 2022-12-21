const Discord = require("discord.js");

module.exports = async function(msg, argue){
    try{
        if(msg.member.hasPermission("MANAGE_ROLES")){
            let user = msg.mentions.members.first()

            const role = msg.guild.roles.cache.find(name => name.name === "Silenced")
            
            const notMuteEmbed = new Discord.MessageEmbed()
                .setColor(`${process.env.ModColour}`)
                .setDescription("Member isnt muted")
            const muteEmbed = new Discord.MessageEmbed()
                .setColor(`${process.env.ModColour}`)
                .setDescription("Member has been unmuted")


            if(!(user.roles.cache.has(role.id))) {return msg.channel.send(notMuteEmbed)}else{
                user.roles.remove(role)
                msg.channel.send(muteEmbed)
                user.send(`You were unmuted`)
            }
        }else{
            const errorEmbed = new Discord.MessageEmbed()
                .setColor(`${process.env.ErrorColour}`)
                .setDescription("You do not have the permissions to use this command")
            msg.channel.send(errorEmbed)
        }
    }catch(err){
        const mentionEmbed = new Discord.MessageEmbed()
            .setColor(`${process.env.ErrorColour}`)
            .setDescription("No user mentioned")
        msg.channel.send(mentionEmbed)
    }
}
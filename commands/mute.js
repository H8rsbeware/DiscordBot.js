const Discord = require("discord.js");

module.exports = async function(msg, argue){
    try{
        if(msg.member.hasPermission("MANAGE_ROLES")){
            let user = msg.mentions.members.first()
            if(user.hasPermission("MANAGE_ROLES")){
                const unableEmbed = new Discord.MessageEmbed()
                    .setColor(`${process.env.ErrorColour}`)
                    .setDescription("You cannot mute that user")
                msg.channel.send(unableEmbed)                
            }else{
                if(user.id === msg.author.id){
                    const selfEmbed = new Discord.MessageEmbed()
                        .setColor(`${process.env.ErrorColour}`)
                        .setDescription("Cant mute yourself")
                    msg.channel.send(selfEmbed)           

                }else{
                    let role = msg.guild.roles.cache.find(name => name.name === "Silenced")
                    if(!role){console.log("No role found")}
                    
                    const alreadyEmbed = new Discord.MessageEmbed()
                        .setColor(`${process.env.ModColour}`)
                        .setDescription(`User is already muted`)

                    if ((user.roles.cache.has(role.id))){return msg.channel.send(alreadyEmbed)}else{
                        let reason = argue.slice(1).join(" ");
                        if(reason === " " || reason === ""){reason = "probably being a lil bitch (Default message)"}

                        user.roles.add(role)

                        const muteEmbed = new Discord.MessageEmbed()
                            .setColor(`${process.env.ModColour}`)
                            .setDescription(`${user} has be muted for "${reason}"`)
                        await msg.channel.send(muteEmbed)

                        user.send(`You were muted for "${reason}"`)
                    }
                }
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
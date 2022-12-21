const Discord = require("discord.js");
const random = ['So long','Bye Bye','Adios','Au revoir','Be gone thot']
module.exports = function (msg, argue){
    if (msg.member.hasPermission("KICK_MEMBERS")){
        if (!msg.guild) return;
        let reason = argue.slice(1).join(" ");
        if(reason === " " || reason === ""){reason = "probably being a lil bitch"}
        const user = msg.mentions.users.first();
        if(user){
            const member = msg.guild.member(user);
            if(member){
                member.kick(reason).then(()=>{
                    const kickEmbed = new Discord.MessageEmbed()
                        .setColor(`${process.env.ModColour}`)
                        .setDescription(`${user.username} has been kicked from the server, ${random[Math.floor(Math.random()*random.length)]}`)
                    msg.channel.send(kickEmbed)
                }).catch(err =>{
                    const errorEmbed = new Discord.MessageEmbed()
                        .setColor(`${process.env.ErrorColour}`)
                        .setDescription('Unable to kick')
                        .setFooter('This Error was logged')
                    msg.channel.send(errorEmbed)
                    console.log(err)
                });
            }else{
                const errorEmbed = new Discord.MessageEmbed()
                    .setColor(`${process.env.ErrorColour}`)
                    .setDescription('User not in the server')
                    .setFooter('This Error was logged')
                msg.channel.send(errorEmbed)
            }
        }else{
            const mentionEmbed = new Discord.MessageEmbed()
                .setColor(`${process.env.ErrorColour}`)
                .setDescription("No user mentioned")
            msg.channel.send(mentionEmbed)
        }
    }else{
        const errorEmbed = new Discord.MessageEmbed()
                .setColor(`${process.env.ErrorColour}`)
                .setDescription("You do not have the permissions to use this command")
        msg.channel.send(errorEmbed)
    }
}
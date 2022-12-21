const Discord = require("discord.js")
module.exports = async function(msg, argue){
    try{
        if(msg.member.hasPermission("MANAGE_MESSAGES")){
            const amount = argue.join(" ")
    
            const amountEmbed = new Discord.MessageEmbed()
                .setColor(process.env.ErrorColour)
                .setDescription("Atleast 1 message needs to be deleted")
            const manyEmbed = new Discord.MessageEmbed()
                .setColor(process.env.ErrorColour)
                .setDescription("No more than 100 messages can be deleted at once")
            const validEmbed = new Discord.MessageEmbed()
                .setColor(process.env.ErrorColour)
                .setDescription("The amount must be in integer form (i.e. 10)")    
            const otherErrorEmbed = new Discord.MessageEmbed()
                .setColor(process.env.ErrorColour)
                .setDescription("Messages cant be deleted")
            const successEmbed = new Discord.MessageEmbed()
                .setColor(process.env.ModColour)
                .setDescription(`Successfully cleared ${amount} messages`)      
            const oldEmbed = new Discord.MessageEmbed()
                .setColor(`${process.env.ErrorColour}`)
                .setDescription("Some messages are older than 14 days.")
            
            try{
                if(!amount || amount < 1){
                    msg.channel.send(amountEmbed)
                }else if(amount > 100){
                    msg.channel.send(manyEmbed)
                }else{
                    (async () => {  
                        let fetched;
                        do{
                            fetched = await msg.channel.messages.fetch({limit: amount});
                            msg.channel.bulkDelete(fetched).catch(err =>{
                                let flag = 10;
                                do{
                                    msg.channel.bulkDelete(flag).catch(err =>{
                                        flag =- 2;
                                    })
                                }while(flag < 0);
                                fetched = [];
                                return;
                            });
                        }
                        while(fetched.size != 0);
                    })();
                }
            }catch(err){
                if(!Number.isInteger(amount)){
                    msg.channel.send(validEmbed)
                }else{
                    msg.channel.send(otherErrorEmbed)
                    console.log(err)
                }
            }
        }else{
            const errorEmbed = new Discord.MessageEmbed()
                .setColor(`${process.env.ErrorColour}`)
                .setDescription("You do not have the permissions to use this command")
            msg.channel.send(errorEmbed) 
        }
    }catch{
        msg.channel.send(oldEmbed)
    }
}
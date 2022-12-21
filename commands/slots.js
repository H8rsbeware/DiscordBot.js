const Discord = require('discord.js')

module.exports = function(msg, argue){
    const emojis = ['🥝','🍓','🍋','🍊','🥇','🍍'];

    let user = msg.member.user.username;
    let roll = new Array(3)
    for(let i = 0; i < roll.length; i++){
        let random = Math.floor(Math.random()*emojis.length)
        roll[i] = emojis[random];
    }
    let text
    let foot
    if(roll[0] == roll[1] && roll[1] == roll[2]){
        if(roll[0]=='🥇'){
            text = "**Jackpot**"
            foot = "A Jackpot is a 1 in 4374 Chance!"
        }else{
            text = "**Win**"
            foot = "Chance : 1 in 729"
        }
    }else{
        text = "*Bust*"
        foot = "Chance : 728 in 729"
    }
    const slots = new Discord.MessageEmbed()
        .setColor(`${process.env.ReturnColour}`)
        .setTitle("SLOTS | "+user)
        .setDescription(` \n${roll[0]}\xa0\xa0\xa0\xa0\xa0\xa0${roll[1]}\xa0\xa0\xa0\xa0\xa0\xa0${roll[2]}\xa0\xa0\n\n ${text}`)
        .setFooter("Created by H8rs | "+foot)
    msg.channel.send(slots)
    msg.delete({timeout: 3000})
}

//🥝🍓🍋🍊🥇
//['🥝','🍓','🍋','🍊','🥇'];
//['🥇','🥇','🥇','🥇','🥇'];
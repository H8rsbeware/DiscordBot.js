const Discord = require('discord.js');

module.exports = function (msg, argue){
    let page = 1
    if (argue.length>0){page = argue.join(" ");}

    if (page == 1){
        const helpPageOne = new Discord.MessageEmbed()
            .setColor(`${process.env.HelpColour}`)
            .setTitle("Page 1 | Help | Moderation")
            .setDescription(" **kick {@ + optional reason}** - *Kick a member from the server* \n\n **ban {@ + optional reason}** - *Ban a member from the server* \n\n **tweet {required message}** - *Post a message on Twitter* \n\n **mute {member}** - *Mutes a member until unmuted*\n\n **unmute {member}** - *Unmutes a muted member*\n\n **clear {amount}** - *Deletes that amount of messages*\n\n **help {page}** - *...🤦‍♂️*\n")
            .setFooter("The Prefix is > | >help 2")
        msg.channel.send(helpPageOne);
    }else if(page == 2){
        const helpPageTwo = new Discord.MessageEmbed()
            .setColor(`${process.env.HelpColour}`)
            .setTitle("Page 2 | Help | Search")
            .setDescription(" **weather {optional city}** - *Basic weather report for Major Cities* \n\n **nasa {optional: mars/epic/weather}** - *Returns an image or report from the NASA database*\n\n **gif {optional search term}** - *Search for a gif on Tenor* \n\n **covid {optional location}** - *Deaths, Cases, and Recovery stats* \n\n **countries {dm}** - *Sends a list of countries that have covid stats* \n\n **twitter {optional search term}** - *Search a random Tweet from the Top 10* \n\n **latest** - *Gets the Latest tweet from @H8rs4* \n ")
            .setFooter("The Prefix is > | >help 3")
        msg.channel.send(helpPageTwo);
    }else if(page == 3){
        const helpPageThree = new Discord.MessageEmbed()
            .setColor(`${process.env.HelpColour}`)
            .setTitle("Page 3 | Help | Misc")
            .setDescription(" **shark** - *Returns pog* \n\n **who** - *Returns who asked* \n\n **roll** - *roll a six side dice* \n\n **flip** - *flip a balanced coin* \n\n **vote {poll subject}** - *Start a 2 answer poll* \n\n **hate** - *Receive a random message back* \n\n **slots** - *Initates a simple game of slots* \n")
            .setFooter("The Prefix is > | >help 1")
        msg.channel.send(helpPageThree);
    }else {
        const errorEmbed = new Discord.MessageEmbed()
            .setColor(`${process.env.ErrorColour}`)
            .setDescription("Thats not a valid page")
        msg.channel.send(errorEmbed);
    }
}

const Discord = require('discord.js');
const Twit = require('twit');
const config = require('./config');
const tweet = new Twit(config);

module.exports = function (msg, argue){
    if (msg.author.id == `${process.env.OwnerID}`){
        let intSend = argue.join(" "); 
        let tweetSend = {
            status: intSend,
        }
        tweet.post('statuses/update', tweetSend, tweeted);

        function tweeted(err, data, response){
            if(err){
                const errorEmbed = new Discord.MessageEmbed()
                    .setColor(`${process.env.ErrorColour}`)
                    .setTitle('Error')
                    .setDescription("Character or Other Restriction")
                    .setFooter('This Error was logged')
                msg.channel.send(errorEmbed)
                console.log(err);
            }else if(data){
                console.log(data);
                const tweetEmbed = new Discord.MessageEmbed()
                    .setColor(`${process.env.ReturnColour}`)
                    .setTitle('Tweet Successful')
                    .setDescription('You tweeted "'+intSend+'"!')
                    .setFooter('Command exclusive to H8rs | Tweeted to @H8rs4')
                msg.channel.send(tweetEmbed)
            }
        }
    }else{
        const unauthSend = new Discord.MessageEmbed()
            .setColor(`${process.env.ErrorColour}`)
            .setDescription("You are not permitted to use this command!")
            .setFooter("This is only usable by @H8rs#8504")
        msg.channel.send(unauthSend);
    }
}
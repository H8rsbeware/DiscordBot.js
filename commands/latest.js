const Discord = require('discord.js');
const Twit = require('twit');
const config = require('./config');
const tweet = new Twit(config);

module.exports = function (msg, argue){
    var param = {
        user_id:"1295673054077620224",
        count:1,
        exclude_replies: true,
        include_rts: false,
    }
    tweet.get('statuses/user_timeline', param, receive);

    function receive(err, data, response){
        var tweets = data;
        let i = 0;
        try{
            console.log(data)
            let source = tweets[i].text;
            let date = tweets[i].created_at.split(" +0000");
            let author = tweets[i].user.name;
            let pfp = tweets[i].user.profile_image_url_https;
        
            const tweetEmbed = new Discord.MessageEmbed()
                .setColor(`${process.env.ReturnColour}`)
                .setTitle(author + " | Latest Tweet")
                .setDescription(source)
                .setThumbnail(pfp)
                .setFooter(`Posted: ${date} `)
            msg.channel.send(tweetEmbed);
        }catch (err){
            const errorEmbed = new Discord.MessageEmbed()
                .setColor(`${process.env.ErrorColour}`)
                .setTitle('Error')
                .setDescription('No tweet avaliable')
                .setFooter('This Error was logged')
            msg.channel.send(errorEmbed)
            console.log(err);
        }
    }
}
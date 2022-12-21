const Discord = require('discord.js');
const Twit = require('twit');
const config = require('./config');
const tweet = new Twit(config);

module.exports = function (msg, argue){
    let term = "Covid";
    if (argue.length > 0){term = argue.join(" ");} 
    let textError = new Error('Search Term returned Invalid Text')
    var param = {
        q: term,
        count: 10,
        lang: "en",
        result_type:"popular"
    }
    tweet.get('search/tweets', param, receive);
    
    function receive(err, data, response){
        var tweets = data.statuses;
        const i = Math.floor(Math.random()*param.count);
        try{
                let source = tweets[i].text;
                let date = tweets[i].created_at.split(" +0000");
                let author = tweets[i].user.name;
                let pfp = tweets[i].user.profile_image_url_https;
                let local = tweets[i].user.location;
            
                const tweetEmbed = new Discord.MessageEmbed()
                    .setColor(`${process.env.ReturnColour}`)
                    .setTitle(author + " | " + term)
                    .setDescription(source)
                    .setThumbnail(pfp)
                    .setFooter(`${local} | ${date} `)
                msg.channel.send(tweetEmbed);
        }catch (err){
            const errorEmbed = new Discord.MessageEmbed()
                .setColor(`${process.env.ErrorColour}`)
                .setTitle('Error')
                .setDescription(textError)
                .setFooter('This Error was logged')
            msg.channel.send(errorEmbed)
            console.log(err);
        }
    }   
    
};

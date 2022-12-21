const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = async function(msg, argue){
    try{
        let curr = "no curr";
        if (argue.length>0){curr = argue.slice(0).join(" ");}
        
        let exceptedTermERG = new Set(["Erg", "Ergo", "ERGO", "ERG"]);
        let exceptedTermETH = new Set(["ETH", "eth", "ethereum", "Ethereum", "ether", "Ether"]);

        if (msg.author.id == `${process.env.OWNERID}` && argue.length<1){
            if (exceptedTermETH.has(curr)){
                let nano = 'https://api.nanopool.org/v1/eth/balance/0x433913E5F08bE6DFE4F058a18c9dc8F67Eb9D0d6';
                let nanoRep = await fetch(nano);
                let json = await nanoRep.json();
                curr = "ETH";

                let bal = `${json.data}ETH`
                
                const returnWallet = new Discord.MessageEmbed()
                    .setColor(`${process.env.ReturnColour}`)
                    .setTitle(`${curr} Balance`)
                    .setTimestamp()
                    .setURL('https://eth.nanopool.org/account/0x433913e5f08be6dfe4f058a18c9dc8f67eb9d0d6')
                    .setThumbnail('https://images.forbesda.com/assets/pngs/500-500/t/asset-ether-eth.png')
                    .setDescription(bal)
                msg.author.send(returnWallet);
            }else if (exceptedTermERG.has(curr)){
                if (exceptedTermETH.has(curr)){
                    let nano = 'https://api.nanopool.org/v1/ergo/balance/9gKaXaXXQ7DzsUp86QKGjx8kbqte2Uuc7cPQGLLwrZgMisUjZYN';
                    let nanoRep = await fetch(nano);
                    let json = await nanoRep.json();
                    curr = "ERG";
    
                    let bal = `${json.data}ERG`
                    
                    const returnWallet = new Discord.MessageEmbed()
                        .setColor(`${process.env.ReturnColour}`)
                        .setTitle(`${curr} Balance`)
                        .setTimestamp()
                        .setURL('https://ergo.nanopool.org/account/9gKaXaXXQ7DzsUp86QKGjx8kbqte2Uuc7cPQGLLwrZgMisUjZYN')
                        .setThumbnail('https://s2.coinmarketcap.com/static/img/coins/200x200/1762.png')
                        .setDescription(bal)
                    msg.author.send(returnWallet);
                }
            }
        }else{
            if(argue.length>0)
            {
                curr = argue.slice(0,1)[0];
                if(exceptedTermERG.has(curr)){curr = "erg"}
                if(exceptedTermETH.has(curr)){curr = "eth"}
                wallet = argue.slice(1)[0];
            }
            let nano = `https://api.nanopool.org/v1/${(curr)}/balance/${wallet}`;
            console.log(nano);
            let nanoRep = await fetch(nano);
            let json = await nanoRep.json();
            console.log(json);
            let bal = `${json.data}${curr}`;
            let image;
            curr == "erg" ? image = "https://s2.coinmarketcap.com/static/img/coins/200x200/1762.png" : image = "https://images.forbesda.com/assets/pngs/500-500/t/asset-ether-eth.png";
            
            const returnWallet = new Discord.MessageEmbed()
                .setColor(`${process.env.ReturnColour}`)
                .setTitle(`Coin : ${curr.toUpperCase()} | Wallet : ${wallet}`)
                .setURL(`https://ergo.nanopool.org/account/${wallet}`)
                .setThumbnail(image)
                .setDescription(bal)
                .setTimestamp()
            msg.channel.send(returnWallet);
        }
    }catch(err){
        console.log(err);
    }
}
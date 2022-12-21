const h8Replies = [
    'Go to hell',
    'Sym',
    'Love you too bb gorl',
    'I hate everything',
    'Wanna scrap g',
    'Ill go cry then',
    'I want you to know, you are annoying'
];
module.exports = function (msg, argue){
    const h8RepPos = Math.floor(Math.random()*h8Replies.length); msg.reply(h8Replies[h8RepPos]);
};
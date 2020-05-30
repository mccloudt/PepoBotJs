require('dotenv').config();
const { Client, MessageAttachment } = require('discord.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
const lodash = require('lodash');
const request = require('request');
const pepe = require('./pepe')
//Logs in to the discord token that you receive
//This will be a token when you register your discord bot, change the .env to your own bot's token if you want to use
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);

var titles = [];

console.log(pepe);

bot.on('ready', () => {
    console.info(`I'm logged in as ${bot.user.tag}`);
});

bot.on('message', msg => {
     if(msg.content === '!pepe'){
        getPepe(msg);
    }
    else if(msg.content.includes('!') && msg.content !== '!pepe'){
        getRandomReddit(msg);
    }
});

function getPepe(msg){
    const randomPepe = pepe[Math.floor(Math.random() * pepe.length)];
    console.log(randomPepe);
    const attachment = new MessageAttachment(randomPepe);
    msg.channel.send(attachment);
}
//Will pull a random image from a random subreddit, the api might eventually go down so if it does then expect crashes...
function getRandomReddit(msg){
    var text = msg.content.slice(1, msg.length);
    request(`https://meme-api.herokuapp.com/gimme/${text}`, {json: true}, (err, res, body) => {
        if(res.statusCode == 503){
            msg.channel.send("I don't think this is a subreddit...");
        }else{
            msg.channel.send(`A random image from ${text}`)
            const attachment = new MessageAttachment(body.url);
            msg.channel.send(body.title);
            msg.channel.send(attachment);
            
        }

    })
}
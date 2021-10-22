const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {

  weezerImages= [
    'https://e.snmc.io/i/150/w/3b7b62be495da366b73611a265126d89/2170037',  //1
    'https://e.snmc.io/i/150/w/e734361beefc51ef37a709b04dbd2669/1831337',  //2
    'https://e.snmc.io/i/150/w/198b280752e909d6dae9ac004799590b/1207979',  //3
    'http://e.snmc.io/i/150/w/6fa166105977ff7f6694c177c24d1877/5980281',  //4
    'https://e.snmc.io/i/150/w/78eb77c1e51cf758f54eeb6529002324/8050262',  //5
    'https://e.snmc.io/i/150/w/1487635c25da16d72aff1df131509b12/5423790',  //6
    'https://e.snmc.io/i/150/w/71078e03ac4c63f5c87291da5e2776d0/7243264',  //7
    'https://e.snmc.io/i/150/w/cba161019e229ecbed617109bf25a553/6637042',  //8
    'https://e.snmc.io/i/150/w/e897902b4eec34dab9dbd0c7fb97bfd3/2525163',  //9
    'https://e.snmc.io/i/150/w/9be799f20ab3a5b37e46e8c8ab15f5eb/7720827',  //10
    'https://e.snmc.io/i/150/w/b85a5fd4f23453d6d50b9329a96df62b/7347024',  //11
    'https://e.snmc.io/i/150/w/adfa02f1bb9b7f1b5bdf77674de5af1d/2765534',  //12
    'https://e.snmc.io/i/150/w/014834025c8a777814dd00e4bbc92326/2498816',  //13
    'https://e.snmc.io/i/150/w/9fddecacdffe3e7741af17d22d749a27/1402332',  //14
    'https://e.snmc.io/i/150/w/2ff69f1908169e14fd7c209f582fe58d/3323533',  //15
    'https://e.snmc.io/i/150/w/283cf6c8778b42ccb191d0932ed850d3/3616461'   //16
  ]

  let randomPic = Math.floor(Math.random() * 16) + 1;

  message.channel.send(weezerImages[randomPic])

}

module.exports.config = {
  name: "weezer",
  description: "***W E E Z E R***",
  usage: "=weezer",
  accessableby: "Members",
  aliases: ['w']
}

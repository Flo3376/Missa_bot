const Discord = require ("discord.js");

module.exports.run = async(client,message,args) =>{
	console.log('ping lancé');
 let debut=Date.now();
 await message.channel.send("Ping").then(async(m)=>await m.edit(`Pong : ${Date.now() - debut} ms`));
};

module.exports.help ={
	name: "ping",
	info: `+ping\nTest son ping (pas sur de la justesse du résultat)`,
	admin: false,
};
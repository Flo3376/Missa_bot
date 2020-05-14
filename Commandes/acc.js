const Canvas = require('canvas');

module.exports.run = async (client,message,args) =>{
	const member= message.mentions.members.first() || message.member;
	let data="";

	fs.readFile("./embed/bienvenue.js", "utf-8", (err, data) => {
		//console.log(data)
		eval(data)
		message.channel.send(my_embed)
	});

};



module.exports.help ={
	name: "acc",
	info: `+acc\nSimule l'arrivé d'un joueur`,
	admin: true,
};
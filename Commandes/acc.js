const Canvas = require('canvas');

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

module.exports.run = async (client,message,args) =>{
	const member= message.mentions.members.first() || message.member;
	var fs = require("fs");
	let data="aaa";

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
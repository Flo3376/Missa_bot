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

	

	
	/*message.channel.send(

		`Bonjour :hand_splayed:,

		Bienvenue chez les **Galactic Monkeys.**

		Tout d'abord, merci de ta visite.

		Un **Administrateur** ou un **GM** viendra t'accueillir d'ici quelques minutes, si ce n'est pas le cas, n'hésites pas à leur envoyer un message en privé.

		Tu peux aussi revenir à partir de 20h00, il y a toujours des poilus qui sont présents.

		Pour patienter, tu peux aller visiter nos liens officiels :
		Site : <https://gmonkeys.org/>
		RSI : <https://robertsspaceindustries.com/orgs/GMONKEYS/>
		Facebook : <https://www.facebook.com/gmonkeysSC/>
		Instragram : <https://www.instagram.com/gmonkeyssc/>
		Vidéo de présentation des GM : <https://youtu.be/NxeXRViemLI/>
		Twitter : <https://twitter.com/GmonkeysSC>

		Bonne fin de journée à toi,

		**[GM] Le vieux singe de l'Accueil** :wink:` );
/*
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	// Since the image takes time to load, you should await it
	const background = await Canvas.loadImage('https://discordjs.guide/assets/img/8CQvVRV.cced9193.png');
	// This uses the canvas dimensions to stretch the image onto the entire canvas
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	// Use helpful Attachment class structure to process the file for you
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	message.channel.send(`Welcome to the server, !`, attachment);
	*/
	//définir la taille du background
	/*const canvas = Canvas.createCanvas(1200, 800);
	//convenas en 2d
	const ctx = canvas.getContext('2d');

	//chargement de l'image de BG
	const background = await Canvas.loadImage('./img/bg.jpg');

	//positionnement du BG
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	//définition de la couleur du cadre
	ctx.strokeStyle = '#74037b';

	//dessin du cadre
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Assign the decided font to the canvas
	ctx.font = applyText(canvas, member.displayName);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

	// Slightly smaller text placed above the member's display name
	ctx.font = '50px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Bienvenue chez les ',200, 75);

	// Slightly smaller text placed above the member's display name
	ctx.font = '50px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Galactic Monkeys.',600, 75);




	// Pick up the pen
	ctx.beginPath();
	// Start the arc to form a circle
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	// Put the pen down
	ctx.closePath();
	// Clip off the region you drew on
	ctx.clip();

	// Wait for Canvas to load the image
	const avatar = await Canvas.loadImage("./img/logo.png");
	//incrustation de l'avatar
	ctx.drawImage(avatar, 25, 25, 150,92);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	message.channel.send(`Welcome to the server, !`, attachment);*/


};



module.exports.help ={
	name: "acc"
};
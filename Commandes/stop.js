const Discord = require ("discord.js");
module.exports.run = async (message, serverQueue) =>{
	if (!message.member.voice.channel)
		return message.channel.send(
			"Vous devez être dans le salon vocal pour stopper la musique!"
			);
	
	serverQueue.connection.dispatcher.end();

};

module.exports.help ={
	name: "stop",
	info: `+stop\nCoupe la lecture de fichier audio youtube et effacera la playlist`,
	admin: false,
	channel: "in_serv",
};

module.exports.run = async (message, serverQueue) =>{

	//+play https://www.youtube.com/watch?v=vb_k04U3pNs
	//+play https://www.youtube.com/watch?v=-ScjucUV8v0

	//console.log(message.content)
	const args = message.content.split(" ");

	//si l'argument vaisseau n'est pas définis
	if(!args[0])
	{
		return message.reply("Vous n'avez spécifié pas d'adresse youtube à lire'");
	}

	//on prépare l'objet monkeys
	let monkey= new monkeys();

	//on recherche un correspondance avec un utilisateur existant
	let info = await monkey.search_m(message.author.id).then()
	//si le membre n'existe pas, on le créé immédiatement
	if( info === null)
	{
		result = await monkey.create_m(message.author).then()
		console.log(`création du membre ${message.author['username']}`)
	}

	//creation du tableau de mise à jour
	let new_data={};
	new_data.jeton=monkeys_list[message.author.id].jeton--;
	new_data.time = Date.now();
	new_data.date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

	//mise à jour des donnée du membres
	info = await monkey.update_m(new_data).then()

	monkeys_list[message.author.id]=monkey;
	monkeys_list[message.author.id].jeton--;
	

	const voiceChannel = message.member.voice.channel;
	if (!voiceChannel)
		return message.reply(
			"Vous devez être dans un salon vocal pour pouvoir joueur de la musique!"
			);
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
		return message.reply(
			"Je n'ai pas le droit de diffuser de la musique dans ce salon"
			);
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 0.7,
			playing: true
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.reply(err);
		}
	} else {
		serverQueue.songs.push(song);
		return message.reply(`${song.title} a été rajouté à la file d'attente!`);
	}
	function play(guild, song) {
		const serverQueue = queue.get(guild.id);
		if (!song) {

			if(standby===false)
			{
				serverQueue.voiceChannel.leave();
			}

			
			
			queue.delete(guild.id);
			return;
		}

		const dispatcher = serverQueue.connection
		.play(ytdl(song.url))
		.on("finish", () => {
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on("error", error => console.error(error));
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 2);
		serverQueue.textChannel.send(`Lecture de : **${song.title}**`);
	}
};

module.exports.help ={
	name: "play",
	info: `+play [lien youtube]\nLancera la lecture **audio** d'un lien youtubre, ex : +play https://www.youtube.com/watch?v=vb_k04U3pNs .Attention Missa ne peux être que sur un salon. Si une musique est déjà en cours, celle que vous proposerez sera mis playlist.`,
	admin: false,
	channel: "in_serv",
};
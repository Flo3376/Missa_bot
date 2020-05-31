module.exports.run = async (client,message) =>{
	//chargement des paramêtres de cette commande
	const param = client.commands.get('skip').help

	/*
	*	initialisation d'un routeur entrant/sortant
	*
	*	@param: paramétre des droits entrants et sortant du message indiqués dans le help de la commande
	*/
	var switch_msg=new msg_sw(param,client,message)
	//envoie des données concernant le message entrant
	switch_msg.init(client,message)
	//console.log(switch_msg)

	//si dans le processus de vérification des entrés tout est ok, on peux envoyer la réponse
	if(switch_msg.error.length==0)
	{
		if (!message.member.voice.channel)
		{
			return switch_msg.response(client,message,"Vous devez être dans le vocal pour pouvoir changer de musique!")
		}
		if (!serverQueue)
		{
			return switch_msg.response(client,message,"Pas d'autre musique dans la file d'attente!")
		}
		serverQueue.connection.dispatcher.end();
		
	}
	else
	{
		console.log(`Nombre d'erreur : ${switch_msg.error.length}`)
		console.log(`Erreur(s) : ${switch_msg.error}`)
		return
	}
	
};

module.exports.help ={
	name: "skip",
	info: `+skip\nLancera la musique suivante de la playlist`,
	admin: false,
	in:"text", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "dm", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé
};
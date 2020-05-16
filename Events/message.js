const prefix= config.prefix;

//si un event client.message arrive
module.exports = async(client,message)=>{

	//refus des commandes venant d'un autre bot
	if(message.author.bot) return;

	//si le message ne commance pas par +
	if(!message.content.startsWith(prefix)) return;

	const args = message.content.slice (prefix.length).trim().split(/ +/g);
	const commande = args.shift();

	const cmd = client.commands.get(commande);
	
	console.log(`L'utilisateur ${monkeys_list[message.author.id].name} à fait appel à la commande : ${commande} , arguments ${args} à ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`)
	

	//si la commande n'existe pas
	if(!cmd) return message.channel.send("Et encore un qui n'est pas capable de saisir une commande valide, ça me fatigue!, Tapes +help pour avoir les commandes actives");;
	
	//si la commande doit être exécuter uniquement dans un chat du serveur et que ce n'est pas le cas
	if(cmd.help.channel ==="in_serv" && message.channel.type ==="dm" )
	{
		message.author.send("Cette commande ne peut pas être utilisée en message privé");
	}
	//si la commande doit être exécuter uniquement dans un chat du serveur et que c'est le cas
	else if(cmd.help.channel ==="in_serv" && message.channel.type !=="dm" )
	{
		//si la commande concerne la lecture de fichier
		if(commande==='play' || commande==='skip' || commande==='stop')
		{
			serverQueue = queue.get(message.guild.id);
			cmd.run(message,serverQueue);
		}
		else
		{
			cmd.run(client,message,args);
		}
	}
	//si la commande peut être exécuter à partir d'un message privé uniquement
	else if(cmd.help.channel ==="dm" && message.channel.type ==="dm")
	{
		cmd.run(client,message,args);
	}
	//si la commande peut être exécuter à partir d'un message privé ou d'un channel du serveur
	else if(cmd.help.channel ==="both")
	{
		cmd.run(client,message,args);
	}
	else
	{
		message.author.send("Cette commande ne peut pas être utilisée en message privé");
	}

	//si la commande ne vient pas d'un message privée ou peut le supprimer 
	//(si cette sécurité n'est pas là, celà provoque des warnings à la console)
	if(message.channel.type !=="dm" )
	{
		message.delete();
	}

	
};
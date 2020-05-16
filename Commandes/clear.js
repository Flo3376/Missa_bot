//si la commande clear est appelé
module.exports.run = async(client,message,args) =>{
	//si l'utilisateur n'a pas les droits de gérer les messages
	if (!message.member.hasPermission("MANAGE_MESSAGES"))
	{
		return message.author.send("Vous n'avez pas la permisssion");
	}

	//si l'argument n'est pas donnée
	if(!args[0])
	{
		return message.author.send("Vous n'avez spécifiez le nombre de messages à supprimer");
	}

	//si l'argument n'est pas un chiffre
	if(isNaN(args[0]))
	{
		return message.author.send("Vous n'avez spécifiez un nombre réelle");
	}
	//destruction de x message
	message.channel.bulkDelete(args[0])

};
module.exports.help ={
	name: "clear",
	info: `+clear [un nombre]\n Supprime X (maximum 100) messages dans le salon textuel en cours, ex: +clear 50`,
	admin: true,
	channel: "in_serv"
};
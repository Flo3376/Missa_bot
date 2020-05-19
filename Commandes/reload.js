//si la commande clear est appelé
module.exports.run = async(client,message,args) =>{
	
	//si l'argument n'est pas donnée
	if(auto_reload===false)
	{
		auto_reload=true;
		return message.author.send("Auto-reload activé");
	}
	else{
		auto_reload=false;
		return message.author.send("Auto-reload désactivé");
	}
};
module.exports.help ={
	name: "reload",
	info: `+reload, active ou désactive l'autho-rechargement de tous les scripts `,
	admin: true,
	channel: "dm"
};
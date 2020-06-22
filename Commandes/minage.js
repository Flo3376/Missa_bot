module.exports.run = async (client,message) =>{
	const args = message.content.split(" ");
	
	//chargement des paramêtres de cette commande
	const param = client.commands.get('minage').help

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
		
		

		//on charge la methode request pour faire une demande post
		const request = require('request')
		let text=[];
		let mes_test=0;
		console.log('https://mysctools.ovh/e107_plugins/sc_trad/page/request/mreq_minage.php')
		request.post(
			'https://mysctools.ovh/e107_plugins/sc_trad/page/request/mreq_minage.php',
			(error, res, data) => {
				if (error) {
					console.error(error)
					return
				}
					//on parse le json reçu
					json_data=JSON.parse(data);

					let min_info="";
					console.log(json_data)
					//on parcours le json
					json_data.forEach((Minage)=>{
						let new_line="***Nom : "+Minage.name+"***\n"+"Nom commun : " +Minage.n_text+"\n"+"Prix de base : " +Minage.b_price+" aUEC/SCU\n"+Minage.text+"\n\n";
						switch_msg.response(client,message,new_line)
						//si le contenaire du bloc réponse est remplie de moin de 2000 caractére on continue à le remplir
						if((new_line.length+min_info.length)<2000)
						{
							min_info=min_info+""+new_line;
							text[mes_test]=min_info;
						}
						//sinon on ouvre un autre contenaire
						else
						{
							min_info="";
							mes_test++;
							min_info=min_info+""+new_line;
							text[mes_test]=min_info;
						}
					})
					//on envoie les contenaires les uns aprés les autres
					text.forEach((bloc)=>{
						//switch_msg.response(client,message,bloc)
					})
				})
	}
	else
	{
		console.log(`Nombre d'erreur : ${switch_msg.error.length}`)
		console.log(`Erreur(s) : ${switch_msg.error}`)
		return
	}
};
module.exports.help ={
	name: "minage",//nom de la commande
	info: `+minage vous retournera les cours boursiers des différentes ressource minable`,//texte descriptif de la commande
	admin: false, //true/false cette commande ne peut être utilisé que par un administrateur
	in:"both", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "dm", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé
};

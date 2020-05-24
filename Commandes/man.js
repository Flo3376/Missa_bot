module.exports.run = async (client,message,args) =>{

	for (var i = 0; i < man.length; i++)
	{
var my_embed={
			"embed": {
				"title": `id n°${i}, ${man[i].name}`,
				"url": man[i].links,
				"color": 15179008,
				"description":  `${man[i].links} \n Tapez "+man_id ${i}" pour voir la liste des vaisseaux construit par ${man[i].name}`,
				"thumbnail": {
					"url": man[i].img
				}, 


			} 
		}
		message.author.send(my_embed)
	}
}

module.exports.help ={
	name: "man",
	info: `Retourne la liste des fabricants`,
	admin: false,
	channel: "both",
};
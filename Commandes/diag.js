const Discord = require ("discord.js");

//si la commande diag est appelé
module.exports.run = async(client,message,args) =>{
	console.log('diag demandé');

	//on revnoie les données dans la console du robot
	console.log(salon_list);
	console.log(monkeys_list);
	

};
module.exports.help ={
	name: "diag",
	info: `+diag\n Retourne dans les consoles les tableaux monkeys_list et salon_list`,
	admin: true,
	channel: "in_serv"

};
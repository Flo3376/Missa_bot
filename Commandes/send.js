const Discord = require ("discord.js");
const moment = require ("moment")

module.exports.run = async (client,message, args) =>{
	const membre= message.mentions.members.first() || message.member;

	message.author.send({
		embed:{
			color: 3447003,
			title:`Statistique de l'utilisateur **${membre.nickname}**`,
			thumbnail:{
				url : membre.user.displayAvatarURL()
			},
			fields: [
			{
				name:">ID : ",
				value : membre.id
			},
			{
				name:"Dans le salon : ",
				value : `${salon_list[monkeys_list[membre.id].salon].name}`
			}
			,
			{
				name:"Jeu / activitée: ",
				value : `${monkeys_list[membre.id].game}`
			}
			,
			{
				name:"Nombre de jetons : ",
				value : `${monkeys_list[membre.id].jeton}`
			}
			,
			{
				name:"Niveau d'alerte : ",
				value : `${monkeys_list[membre.id].alert}`
			}
			],
			footer: {
				text:`Fin du rapport`
			}
		}
	})
};

module.exports.help ={
	name: "send",
	info: `+send\npage de stress test de la messagerie pour résoudre les soucis de warning`,
	admin: true,
};
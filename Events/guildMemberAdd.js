//si un event guildMemberAdd arrive (un nouveau membre rejoint le discord)
module.exports = async(member,client,message)=>{

	//on parcours les membres que nous retourne l'api discord
	var users = member.users.cache;
	for(let usr of users.values())
	{

		//on prépare l'objet monkeys
		let monkey= new monkeys();
		
		//on recherche un correspondance avec un utilisateur existant
		info = await monkey.search_m(usr['id']).then()
		//si pas d'info on le créé et on lui suite la bienvenue

		
		if( info === null)
		{
			console.log(usr)
			fs.readFile("./embed/bienvenue.js", "utf-8", (err, data) => {
				//console.log(data)
				eval(data)
				usr.send(my_embed)
			});
			result = await monkey.create_m(usr).then();
			monkeys_list[usr.id]=monkey;
		}
		else
		{
			//console.log(info)
		}
	}
};

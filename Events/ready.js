//si un event on ready arrive arrive (le boot a démarré et s'est connecté avec succés)
module.exports =async(client) =>{
	client.user.setPresence({activity:{name:"Ré écriture compléte du core du robot"}});

	let  channels = client.channels.cache;

	for(let channel of channels.values())
	{
		//on prépare l'objet monkeys
		let salon= new salons_m();
		
		//on recherche un correspondance avec un salon existant
		let info = await salon.search_s(channel["id"]).then()
		//si le salon n'exsite pas on le créé
		if( info === null){result = await salon.create_s(channel).then();}
		//sinon on le met à jours de toute façon
		else{result = await salon.update_s(channel).then();}

		salon_list[channel["id"]]=salon;

		//console.log(salon_list[channel["id"]]);
	}
	//console.log(salon_list);
	
	let  users = client.users.cache;
	for(let usr of users.values())
	{

		//on prépare l'objet monkeys
		let monkey= new monkeys();
		
		//on recherche un correspondance avec un utilisateur existant
		let info = await monkey.search_m(usr['id']).then()
		if( info === null)
		{
			result = await monkey.create_m(usr).then()
			console.log(`création du membre ${usr['username']}`)
		}
		monkeys_list[usr.id]=monkey;
	}

	//chargement du parseur de page HTML
	const cheerio = require('cheerio'),cheerioTableparser = require('cheerio-tableparser');

	//construction du lien à parser
	const url = 'https://starcitizen.tools/List_of_Ship_and_Vehicle_Prices';

	//index pour la liste des ship
	var id_ships=0;

	//requete HTTP
	request.post(
		url,
		(error, res, data) => {
			if (error) {
				console.error(error)
				return
			}
			//chargement des données de la page appelée pour le parsage
			var $ = cheerio.load(data);

			let table_find = [];
			let table_data = [];

			//rechcerche du tableau à inspecter (il n'y en a qu'un seul)
			$("table").each(function (i, table) {
				//mise en mémoire du tableau
				table_find.push(table)
			});
			//chargement du tableau récupérer pour le parsage
			$ = cheerio.load(table_find[0])

			//parsage du tableau en mod code (en gros ce qui est visible en faisant F12, a ref, class, id ....)
			cheerioTableparser($);
			var data_link = $("table").parsetable();

			//parsage du tableau en mod text (ce que vera un utilsateur sur son écran)
			cheerioTableparser($);
			var datas_text = $("table").parsetable(true, true, true);

		//on parcours le tableau HTML pour le convertir en tableau nodejs (lecture en colone)
		for (var i = 1; i < datas_text[1].length; i++)
		{ 	

			//création d'une variable qui indiquera quelle constructeur évoque un appareil
			let actual_man="";

			//chargment du nom du constructeur se trouvant sur la seconde colone
			$ = cheerio.load(data_link[1][i]);

			//mise en mémoire du constructeur actuellement évoqué
			$("a").each(function (i, link) {
				if(man.find(man => man.name === $(link).attr('title')))
				{
					actual_man=man.find(man => man.name === $(link).attr('title'));
					//console.log(`je ai trouvé ${$(link).attr('title')}`)
				}
			});


			//récupération des liens appareils et nom des appareil via la première colone
			$ = cheerio.load(data_link[0][i]);
			let ship_links=[]
			$("a").each(function (i, link) {
				let ship=[];
				ship['id']=id_ships;
				ship['name']=$(link).attr('title');
				ship['link']=$(link).attr('href');
				ship['logo']=man[actual_man.id].img;
				all_ships.push(ship);

				man[actual_man.id].ships.push(ship);
			});
			id_ships++;
		}

	})

	console.log('Ready to fight');
	//sqlite.close();
};
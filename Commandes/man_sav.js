module.exports.run = async (client,message,args) =>{

	//index pour la liste des ship
	var id_ships=0;

	//purge du tableau des ships
	all_ships=[]

	//on charge la methode request pour faire une demande post
	const request = require('request')

	//chargement du parseur de page HTML
	const cheerio = require('cheerio'),cheerioTableparser = require('cheerio-tableparser');

	//construction du lien à parser
	const url = 'https://starcitizen.tools/List_of_Ship_and_Vehicle_Prices';
	
	console.log(man.find(man => man.name === "Drake Interplanetary"))

	if(man.find(man => man.name === "Drake Interplanetary"))
	{
		console.log(`je ai trouvé le test`)
	}
	else
	{
		console.log(`je n'ai pas trouvé le test`)
	}

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
				//console.log(`tableau : ${i}`)
				//mise en mémoire du tableau
				table_find.push(table)
			});
			//console.log(table_find[0])

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
					
					else
					{
						console.log(`je n'ai pas trouvé ${$(link).attr('title')}`)
					}
				});
				
				
				//récupération des liens appareils et nom des appareil via la première colone
				$ = cheerio.load(data_link[0][i]);
				let ship_links=[]
				$("a").each(function (i, link) {
					//let ship={"name" : $(link).attr('title'), "link": $(link).attr('href')};
					let ship=[];
					ship['id']=id_ships;
					ship['name']=$(link).attr('title');
					ship['link']=$(link).attr('href');

					


					all_ships.push(ship);
					
					man[actual_man.id].ships.push(ship);
				});
				id_ships++;
			}
			//console.log(man[14].ships)
			//description=description+"["+name_link+",](https://starcitizen.tools"+$(link).attr('href')+")      "
			for (var i = 0; i < man.length; i++)
			{

				let fields=[];
				for (var i2 = 0; i2 < man[i].ships.length; i2++)
				{
					//let one_links="["+name_link+"](https://starcitizen.tools"+$(link).attr('href')+")"
					let one_field=[]
					//création du field
					one_field["name"]="\u200b"
					one_field["inline"]=false
					one_field["value"]="[id n°"+man[i].ships[i2]["id"] +" => "+man[i].ships[i2]["name"]+"\n https://starcitizen.tools"+man[i].ships[i2]["link"]+"](https://starcitizen.tools"+man[i].ships[i2]["link"]+")"
					fields.push(one_field)
					
				}
				
				console.log(fields)

				var my_embed={
					"embed": {
						"title": man[i].name,
						"url": man[i].links,
						"color": 15179008,
						"description": man[i].links,
						"thumbnail": {
							"url": man[i].img
						}, 
						"fields": [
						fields
						]

					} 
				}
				message.author.send(my_embed)
				//console.log(man[i])
			}
			//console.log(all_ships)
		})
}

module.exports.help ={
	name: "man_sav",
	info: `Retourne la liste des appareils construit par le fabricant, "+man_id [x], ex "+man_id 2"`,
	admin: false,
	channel: "both",
};
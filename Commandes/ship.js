module.exports.run = async (client,message,args) =>{
	//on charge la methode request pour faire une demande post
	const request = require('request')

	function dynamicSort(property) {
		var sortOrder = 1;

		if(property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}

		return function (a,b) {
			if(sortOrder == -1){
				return b[property].localeCompare(a[property]);
			}else{
				return a[property].localeCompare(b[property]);
			}        
		}
	}

	//chargement du parseur de page HTML
	const cheerio = require('cheerio'),cheerioTableparser = require('cheerio-tableparser');

	//construction du lien à parser
	const url = 'https://starcitizen.tools/List_of_Ship_and_Vehicle_Prices';
	const fs = require('fs');

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
			let table_data = {};

			//rechcerche du tableau à inspecter (il n'y en a qu'un seul)
			$("table").each(function (i, table) {
				console.log(`tableau : ${i}`)
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
				let ship=[];
				ship["name"]=datas_text[0][i];
				let link=datas_text[0][i]
				link="https://starcitizen.tools/"+link.replace(" ","_");
				ship["link"]=link;

				if(!(datas_text[1][i] in table_data))
				{
					table_data[datas_text[1][i]]={};
				}

				table_data[datas_text[1][i]].push(ship)
			}

			//trie par ordre alphabétique des constructeurs
			let table_data_ordered = {};
			Object.keys(table_data).sort().forEach(function(key) {
				table_data_ordered[key] = table_data[key];
			});

			//on parcours le tableau 
			for (var i = 1; i < table_data_ordered.length; i++)
			{
				table_data_ordered[i].sort(dynamicSort("name"));
			}
			console.log(table_data_ordered)
		})
}

module.exports.help ={
	name: "ship",
	info: `+ship\n Retourne la liste des appareils et leur index pour la commande +FC`,
	admin: false,
	channel: "both",
};
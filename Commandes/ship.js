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
	//const url = 'https://starcitizen.tools/List_of_Ship_and_Vehicle_Prices';
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
			//table_data.sort(dynamicSort("name"));
			//table_data=table_data.sort();

			console.log(table_data_ordered)

			/*

			//création des divers tableaux où seront stockés les images lien et info
			let output = [];
			let images = [];
			let links = []

			//recherche des images et ajout des données dans le tableau img
			$("img").each(function (i, image) {

				images.push($(image).attr('src'));
			});

			//recherche des lient et ajout des données dans le tableau link
			$("a").each(function (i, link) {
				//plusieurs méthode de vérification en cascade (obligatoirement en cascade sinon plantage)
				//pour trouver les liens ainsi que leur nom affiché, Home => /home
				if (link.hasOwnProperty('children')) {
					if (link.children.hasOwnProperty(0)) {
						if (link.children[0].hasOwnProperty("data")) {
							if (!link.children[0].data.includes("\n")) {
								let sub_links = [];
								sub_links["name"] = link.children[0].data;
								sub_links["url"] = $(link).attr('href');
								links.push(sub_links);
							}
						}
					}
				}
			});

			//recherche des différent texte contenu dans des spans ou div, la page à parser n'utilisant pas les id, le contenu peu flotter
			$(".value").each((i, elem) => {
				output.push(elem.children[0].data);
			});
			
			//si aucune images n'est détectées, c'est que la page n'a pas trouvé de correspondance, mais elle à répondu correctement
			if (images.length === 0) {
				//renvoie d'un message de non correspondance
				message.channel.send(`Aucunes correspondances trouvées pour ${args[0]}`)

			}
			else {
				//s'il y a moin de 3 images, le joueur n'est pas affilié à une corpo
				if (images.length < 3) {
					//nettoyage des retours à la lignes et des espaces en trop
					output[5] = output[5].replace(/  /g, ' ')
					output[5] = output[5].replace(/\n/g, '')

					//chargement du template (méthode provisoire car dangereuse avec l'utilisation de la méthode eval())
					fs.readFile("./embed/spectrum2.js", "utf-8", (err, data) => {
						//interprétation du template
						eval(data)
						//envoie du message privée avec la réponse
						message.reply(my_embed)
					});
				}
				//s'il y a plus de 2 images c'est que le membre est affilié à une corpo
				else if (images.length > 2) {
					output[8] = output[8].replace(/  /g, ' ')
					output[8] = output[8].replace(/\n/g, '')

					//chargement du template (méthode provisoire car dangereuse avec l'utilisation de la méthode eval())
					fs.readFile("./embed/spectrum.js", "utf-8", (err, data) => {
						//interprétation du template
						eval(data)
						//envoie du message privée avec la réponse
						message.reply(my_embed)
					});
				}
			}*/
		})
}

module.exports.help ={
	name: "ship",
	info: `+ship\n Retourne la liste des appareils et leur index pour la commande +FC`,
	admin: false,
	channel: "both",
};
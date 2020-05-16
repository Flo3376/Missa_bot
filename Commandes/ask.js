module.exports.run = async (client, message, args) => {

	//on charge la methode request pour faire une demande post
	const request = require('request')

	//affichage de l'utilisateur à vérifier
	console.log(args)

	//chargement du parseur de page HTML
	const cheerio = require('cheerio');

	//construction du lien à parser
	const url = 'https://robertsspaceindustries.com/citizens/'+ args[0];

	const fs = require('fs');

	//requete HTTP
	request.post(
		url,
		(error, res, data) => {
			if (error) {
				console.error(error)
				return
			}

			const $ = cheerio.load(data);

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
			}
		})
};

module.exports.help = {
	name: "ask",
	info: `+ask [Nom du joueur]\nPermet d'accéder au dossier spectrum d'un membre, exemple: +ask gm_bob`,
	admin: true,
	channel: "dm"
};
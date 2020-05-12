const Discord = require ("discord.js");
const moment = require ("moment")



module.exports.run = async (client,message, args) =>{

	//on charge la methode request pour faire une demande post
	const request = require('request')

	console.log(args)

	const cheerio = require('cheerio');
	const url = 'https://robertsspaceindustries.com/citizens/'+args[0];
	const fs = require('fs');


	request.post(
		url,
		(error, res, data) => {
			if (error) {
				console.error(error)
				return
			}
			
			const $ = cheerio.load(data);
			let output = [];
			let images=[];
			let links=[]

			$("img").each(function(i, image) {

				images.push( $(image).attr('src'));
			});
			$("a").each(function(i, link) {

				if(link.hasOwnProperty('children'))
				{
					if(link.children.hasOwnProperty(0))
					{
						if(link.children[0].hasOwnProperty("data"))
						{
							if(!link.children[0].data.includes("\n"))
							{
								let sub_links=[];
								sub_links["name"]=link.children[0].data;
								sub_links["url"]=$(link).attr('href');
								links.push(sub_links);
							}
						}
					}
				}
			});

			$( ".value" ).each( (i, elem ) => {
				output.push(elem.children[0].data);
			});
			console.log(images.length);
			console.log(images);
			console.log(output.length);
			console.log(output);
			console.log(links.length);
			console.log(links);

			if(images.length===0)
			{
				message.channel.send(`Aucunes correspondances trouvées pour ${args[0]}`)
				
			}
			else
			{
				if(images.length<3)
				{
					output[5]=output[5].replace(/  /g,' ')
					output[5]=output[5].replace(/\n/g, '')
					
					fs.readFile("./embed/spectrum2.js", "utf-8", (err, data) => {
						
						eval(data)
						message.channel.send(my_embed)
					});
				}
				if(images.length>2)
				{
					output[8]=output[8].replace(/  /g,' ')
					output[8]=output[8].replace(/\n/g, '')
				
				fs.readFile("./embed/spectrum.js", "utf-8", (err, data) => {
					
					eval(data)
					message.channel.send(my_embed)
				});
			}
		}
	})
};

module.exports.help ={
	name: "ask"
};
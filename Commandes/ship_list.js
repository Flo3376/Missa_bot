module.exports.run = async(client,message,args) =>{
	const request = require('request')
	let text=[];
	let mes_test=0;

	request.post(
		'https://mysctools.ovh/e107_plugins/sc_trad/page/request/mreq_ship.php',
		(error, res, data) => {
			if (error) {
				console.error(error)
				return
			}
			json_data=JSON.parse(data);

			let list_ship="";

			json_data.forEach((ship)=>{
				let new_line="ID: "+ship.id+"\n"+"> *Marque* :"+ship.man+"\n > *Nom* :    "+ship.name+"\n > *Emport* :    "+ship.emport+"\n\n";
				
				//si le message fait moins de 2000 caractére
				if((new_line.length+list_ship.length)<2000)
				{
					list_ship=list_ship+""+new_line;
					text[mes_test]=list_ship;
				}
				//sinon on prépare un nouveau bloc message
				else
				{
					list_ship="";
					mes_test++;
					list_ship=list_ship+""+new_line;
					text[mes_test]=list_ship;
				}
			})
			
			text.forEach((bloc)=>{
					message.author.send(bloc);

				})
			
	})
};

module.exports.help ={
	name: "ship_list",
	info: `+ship_list\nVous donnera la liste des vaisseaux avec leur id unique pris en charge par le site https://mysctools.ovh/`,
	admin: false,
	channel: "both"
};
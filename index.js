//lancement de la lib discord
global.Discord = require('discord.js')

//connexion à discord central et répercution sur les serveurs autorisé
global.client = new Discord.Client()

//état de l'initialisation du bot
var ready=false;

//lancement de la lib de lecture distante
global.fs=require('fs');
global.util = require('util');

//lancement et création des variable de la lib youtube
global.ytdl = require('ytdl-core');
global.queue = new Map();
global.serverQueue ;

//lancement la lib google traduction
global.googleTTS = require('google-tts-api');

//récupération de la configuration
global.config  =  require ( "./config.json" ) ;

//chargement de la lib mysql_lite3
global.sqlite3 = require('sqlite3').verbose();

//récupération de l'objet db
global.sqlite = require("./class/db.js")

//récupération de l'objet monkey
global.monkeys = require("./class/monkey.js")

//récupération de l'objet monkey
global.salons_m = require("./class/salon.js")



//initialisation du bot sur les serveurs abonné
client.login(config.token)

//variable permettant ou pas à missa de rester dans un salon à la fin d'une lecture
global.standby=false;

//variable permettant ou pas de purger le cache des commandes apellées
global.auto_reload=false;

//tableau qui contiendra tous les salons
global.salon_list={};

//tableau qui contiendra tous les son de la commande rh
global.sound_list=[];

//tableau qui contiendra tous les membres
global.monkeys_list={};

//tableau du createur d'aide
global.helps=[];



client.commands = new Discord.Collection();
//chargement des fichiers commandes js
fs.readdir("./Commandes/",(error,f)=>{
	if(error) console.log(error);

	let commandes=f.filter(f=>f.split(".").pop()==="js");
	if(commandes.length<=0)return console.log("Aucune commande trouvée !")

		commandes.forEach((f) => {
			let commande = require(`./Commandes/${f}`);
			console.log(`${f} commande chargée!`);
			client.commands.set(commande.help.name, commande);
			let help_command=[];
			help_command["name"]=commande.help.name;
			help_command["info"]=commande.help.info;
			help_command["admin"]=commande.help.admin;
			helps.push(help_command);

		});
	console.log("======================")
	//console.log(helps);
	//console.log("======================")
})



//chargement des fichiers Events js
fs.readdir("./Events/",(error,f)=>{
	if(error) console.log(error);
	

	f.forEach((f)=>{
		console.log(`${f} events chargée!`);
		const events = require(`./Events/${f}`);
		const event = f.split(".")[0]

		client.on(event,events.bind(null,client))

	});
	console.log("======================")
})

//chargement des fichiers MP3
count=0;
let rep_mp3 = fs.readdirSync("./mp3/");
rep_mp3.forEach((rep)=>{
	let list_mp3=fs.readdirSync("./mp3/"+rep+"/");

	list_mp3.forEach((sound)=>{
		
		sound_list[count]="./mp3/"+rep+"/"+sound;
		count++;
	})
})

//chargement des fichiers pour les commandes cycliques
fs.readdir("./Cycle/",(error,f)=>{
	if(error) console.log(error);

	let cycles=f.filter(f=>f.split(".").pop()==="js");
	if(cycles.length<=0)return console.log("Aucune commande cycliques trouvée !")

		cycles.forEach((f) => {
			let cycle = require(`./Cycle/${f}`);
			console.log(`${f} commande cycliques chargée!`);
		});
	console.log("======================")
})

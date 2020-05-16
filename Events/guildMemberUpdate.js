module.exports = async(client,oldMember, newMember)=>{
	// Si les rôles sont présents sur l'ancien objet membre mais plus sur le nouveau (c'est-à-dire que les rôles ont été supprimés)
	const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
	if (removedRoles.size > 0)
	{
		let role_id= removedRoles.map(r => r.id)[0];
		if(role_id ==="711134205270032404")
		{
			oldMember.send("adieux")
		}
		
	}
	console.log(`The roles ${removedRoles.map(r => r.id)} were removed from ${oldMember.displayName}.`);
	
	// Si le ou les rôles sont présents sur le nouvel objet membre mais ne le sont pas sur l'ancien (c'est-à-dire que les rôles ont été ajoutés)
	const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
	if (addedRoles.size > 0)
	{
		let role_id= addedRoles.map(r => r.id)[0];
		if(role_id ===config.bm_id_role)
		{
			newMember.send("bienvenue")
		}
	} 
	console.log(`The roles ${addedRoles.map(r => r.name)} were added to ${oldMember.displayName}.`);

};
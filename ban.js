API.on(API.CHAT,chatParser);
function chatParser(obj){
	var chat=obj;
	if(chat.message.indexOf("!ban")===0){
		if(API.hasPermission(chat.uid,API.ROLE.MANAGER)){
			API.moderateDeleteChat(chat.cid);
			banUser();
		}
	}
}
function banUser(){
	var userList=API.getUsers();
	var foundUser=0;
	for(var i=0;i<userList.length;i++){
		if(chat.message.substring(6,chat.message.length)==userList[i].un){
			foundUser=1;
			API.moderateBanUser(userList[i].id,5,API.BAN.PERMA);
			break;
		}
	}
	if (foundUser===0){
		API.sendChat("User not found!");
	}
}
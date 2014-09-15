var chat;var isRunning=0;var roulettePlayers=[];var winner;var winnerID;var userList=[];var loopRunning=0;var randomTime='';var timer;var timer2;
function random(){
	randomTime=Math.floor((Math.random()*1000000)+200000);
	timer=setTimeout(function(){
		if(loopRunning===1){
			rouletteInit();
		}
	},randomTime);
}
API.on(API.CHAT,chatParser);
function chatParser(obj){
	chat=obj;
	if(chat.message==="!roulette"){
		if(isRunning===1){
			var joinedGame=0;
			API.moderateDeleteChat(chat.cid);
			for(var i=0;i<roulettePlayers.length;i++){
				if(chat.uid===roulettePlayers[i]){
					joinedGame=1;
					break;
				}
			}
			if(joinedGame===0){
				roulettePlayers.push(chat.uid);
			}
		}
	}
	else if(chat.message==="!startroulette"||chat.message==="!start"){
		if(API.hasPermission(chat.uid,API.ROLE.MANAGER)){
			API.moderateDeleteChat(chat.cid);
			rouletteInit();
		}
	}
	else if(chat.message==="!randomroulette"||chat.message==="!rr"){
		if(API.hasPermission(chat.uid,API.ROLE.MANAGER)){
			API.moderateDeleteChat(chat.cid);
			loopRunning=1;
			random();
			API.sendChat("/em RandomRoulette enabled.");
		}
	}
	else if(chat.message==="!stoproulette"||chat.message==="!stop"){
		if(API.hasPermission(chat.uid,API.ROLE.MANAGER)){
			API.moderateDeleteChat(chat.cid);
			if(isRunning===1||loopRunning===1){
				loopRunning=0;
				isRunning=0;
				randomTime='';
				clearTimeout(timer);
				clearTimeout(timer2);
				API.sendChat("/em "+chat.un+" stopped the game of roulette.");
			}
		}
	}
	else if(chat.message==="!commands"){
		if(API.hasPermission(chat.uid,API.ROLE.MANAGER)){
			API.moderateDeleteChat(chat.cid);
			API.sendChat("/em Commands: !start, !stop, !rr");
		}
	}
	else if(chat.message==="!debug"){
		if(API.hasPermission(chat.uid,API.ROLE.MANAGER)||chat.uid==="50aeaf97877b9217e2fbcf70"){
			API.moderateDeleteChat(chat.cid);
			API.sendChat("/em "+(randomTime/1000)/60+" minutes.");
		}
	}
}
function rouletteInit(){
	if(isRunning===0){
		isRunning=1;
		startRoulette();
		API.sendChat("/em A game of roulette has been started! Type !roulette to enter!");
		winnerID='';
		winner='';
	}
	else{
		API.sendChat("/em A game is already in progress.");
	}
}
function startRoulette(){
	var foundUser=0;
	timer2=setTimeout(function(){
		winnerID=roulettePlayers[Math.floor(Math.random()*(roulettePlayers.length))];
		winner=API.getUser(winnerID);
		API.sendChat("/em "+winner.un+" won the roulette game!");
		if(winner.id===API.getUser().id){
			API.chatLog("You won! Due to Plug.DJ API limitations, I can't move you to your position. Please move yourself manually.",true);
		}
		userList=API.getUsers();
		for(var i=0;i<userList.length;i++){
			if(winner.un===userList[i].un){
				foundUser=1;
				break;
			}
		}
		if(foundUser===0){
			API.sendChat("/em Could not find "+winner.un+"!");
		}
		API.moderateAddDJ(winnerID);
		setTimeout(moveDJ,4000);
		isRunning=0;
		random();
		userList=[];
		roulettePlayers=[];
	},30000);
}
function moveDJ(){
	API.moderateMoveDJ(winnerID,1);
}
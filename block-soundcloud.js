if (typeof originalMessage==='undefined'){
	$(window).unload(function(){
		$.ajax({
			type: 'POST',
			url: '/_/rooms/update',
			contentType: 'application/json',
			data: JSON.stringify({
				"welcome":originalMessage
			})
		});
	})
	var originalMessage=$($(".welcome").children()[2]).text();
	var welcome=$($(".welcome").children()[2]).text();
	if (welcome=="No welcome message"){
		originalMessage="";
		welcome="SoundCloudSkip Active.";
	}
	else if (welcome.indexOf(" SoundCloudSkip Active.")>-1){
		originalMessage=welcome.substring(0,welcome.length-20);
	}
	else if (welcome.indexOf("SoundCloudSkip Active.")>-1){
		originalMessage=welcome.substring(0,welcome.length-19);
	}
	else {
	welcome+=" SoundCloudSkip Active.";
	}
	$.ajax({
		type: 'POST',
		url: '/_/rooms/update',
		contentType: 'application/json',
		data: JSON.stringify({    
			"welcome":welcome
		})
	});
	API.sendChat("/em After the current song finishes, SoundCloud songs will automatically be skipped.");
	API.on(API.ADVANCE,mediaChecker);
}
function mediaChecker(){
	if(API.getMedia().format===2){
		API.moderateForceSkip();
	}
}
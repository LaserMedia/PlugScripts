$(window).unload(function(){
	/*$.ajax({
        type: 'POST',
        url: '/_/gateway/moderate.update_welcome_1',
        contentType: 'application/json',
        data: JSON.stringify({
                "service":"moderate.update_welcome_1",
                "body":[originalMessage]
        })
	});*/
	API.sendChat("/em YouTubeSkip Disabled.");
})

/*var originalMessage=$($(".welcome").children()[2]).text();
var welcome=$($(".welcome").children()[2]).text();
if (welcome=="No welcome message"){
	originalMessage="";
	welcome="YouTubeSkip Active.";
}
else{
	welcome+=" YouTubeSkip Active.";
}
$.ajax({
        type: 'POST',
        url: '/_/gateway/moderate.update_welcome_1',
        contentType: 'application/json',
        data: JSON.stringify({
                "service":"moderate.update_welcome_1",
                "body":[welcome]
        })
});*/
API.sendChat("/em After the current song finishes, YouTube songs will automatically be skipped.");
API.on(API.ADVANCE,mediaChecker);
function mediaChecker(){
	if(API.getMedia().format===1){
		API.moderateForceSkip();
	}
}
$(window).unload(function(){
	API.sendChat("/em YouTubeSkip Disabled.");
})

API.sendChat("/em After the current song finishes, YouTube songs will automatically be skipped.");
API.on(API.ADVANCE,mediaChecker);
function mediaChecker(){
	if(API.getMedia().format===1){
		API.moderateForceSkip();
	}
}
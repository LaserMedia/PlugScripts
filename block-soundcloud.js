$(window).unload(function(){
	API.sendChat("/em SoundCloudSkip Disabled.");
})

API.sendChat("/em After the current song finishes, SoundCloud songs will automatically be skipped.");
API.on(API.ADVANCE,mediaChecker);
function mediaChecker(){
	if(API.getMedia().format===2){
		API.moderateForceSkip();
	}
}
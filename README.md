PlugScripts
===========

I have moved the scripts here. Plug.dj updated the site to use SSL(HTTPS), and to run javascript files on an SSL protected site, the site hosting the javascript file needs to also be using SSL. This was cheaper than getting an SSL certificate.


How to use the scripts:

Add the corresponding code to the destination of a bookmark. (You need to add everything from "javascript" up until the last ";")

Block Youtube:

javascript:(function(){$.getScript('https://raw.githubusercontent.com/LaserMedia/PlugScripts/master/block-youtube.js');}());

Roulette:

javascript:(function(){$.getScript('https://raw.githubusercontent.com/LaserMedia/PlugScripts/master/roulette.js');}());

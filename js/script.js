$(window).scroll(hideAbout);

function hideAbout(e){
	var position = $(window).scrollTop();

	if 	(position > 400 && position < 1600) 
		$("#about .fixed").css("opacity", 1);
	else
		$("#about .fixed").css("opacity", 0);
}


//testing scroll position
// $(window).scroll(function () { 
// 	var scroll = $(window).scrollTop();
// 	$("nav p").remove();
// 	$("nav").append($("<p></p>").text("pixels scrolled:  " + scroll));
// });
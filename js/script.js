//(function(){
var showAt, hideAt;
var position;

mqTab = window.matchMedia("(max-width: 768px) and (min-width: 600px)");
mqPhone = window.matchMedia("(max-width: 600px)");

hideAbout();
$(window).scroll(scrollHandler);

function scrollHandler(e){
	setHidePoints();
	position = $(window).scrollTop();

	hideAbout(position);
}

function hideAbout(position){
	if(mqPhone.matches)
		$("#about .fixed").css("opacity", 1);
	else if (position > showAt && position < hideAt)
		$("#about .fixed").css("opacity", 1);
	else
		$("#about .fixed").css("opacity", 0);
}

function setHidePoints(){
	if (mqTab.matches){
		showAt = 800;
		hideAt = 3000;
	}
	else{
		showAt = 600;
		hideAt = 2000;
	}
}

// })(); 
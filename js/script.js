//(function(){
var showAt, hideAt;
var position;

mqTallWindow = window.matchMedia("(max-width: 768px) and (max-height: 800px)"); 
mqTab = window.matchMedia("(max-width: 768px) and (min-width: 600px)");
mqPhone = window.matchMedia("(max-width: 600px)");


hideAbout();
$(window).resize(scrollHandler);
// mobileNavColor();

$(window).scroll(scrollHandler);


function scrollHandler(e){
	// mobileNavColor();
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
	if (mqTallWindow.matches){
		showAt = 400;
		hideAt = 2000;
	}
	else if (mqTab.matches){
		showAt = 800;
		hideAt = 3000;
	}
	else{
		showAt = 600;
		hideAt = 2000;
	}
}

//white nav is too distracting... 
// function mobileNavColor(){
// 	if (!mqPhone.matches){
// 		if ($(window).scrollTop() > ($(window).height() + 20)){

// 			$("nav").css("background-color", "white"); //changes both mobile and web navigation
// 			$("nav a").css("color", "black");

// 			if (mqTab.matches){
// 				$("#hamburger img[src*='White']").show();
// 				$("#hamburger img[src*='Black']").hide();
// 			}

// 		}
// 		else{
// 			$("nav").css("background-color", "black"); //changes both mobile and web navigation
// 			$("nav a").css("color", "white");

// 			if (mqTab.matches){
// 				$("#hamburger img[src*='White']").hide();
// 				$("#hamburger img[src*='Black']").show();
// 			}
// 		}
// 	}
// }


// })(); 
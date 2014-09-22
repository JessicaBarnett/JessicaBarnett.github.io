//(function(){
	var showAt, hideAt;
	var position;

	mqTallWindow = window.matchMedia("(max-width: 768px) and (max-height: 800px)"); 
	mqTab = window.matchMedia("(max-width: 768px) and (min-width: 600px)");
	mqPhone = window.matchMedia("(max-width: 600px)");


	hideAbout();
	$(window).resize(scrollHandler);

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
			showAt = 300;
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


	$("#contact a img").mouseover(showSocialDetails)
	$("#contact a img").mouseout(removeSocialDetails);

	function showSocialDetails(){
		$("#socialDetails").text($(this).attr("alt"));
	}

	function removeSocialDetails(){
		$("#socialDetails").empty();
	}

// })(); 
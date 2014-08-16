// var stars = {	full: $('<img src="images/fullStar.svg" alt="full star">'),
// 				empty: $('<img src="images/emptyStar.svg" alt="empty star">')
// 			};

// var skillArrays =  {
// 						html5: 4,
// 						css3: 4,
// 						javascript: 4,
// 						jquery: 3,
// 						sass: 3,
// 						git: 3
// 					};


// //just doing it the easy way for now...
// function skillBars(){
// 	fillSkillBar("html5", $('#html5'));
// 	fillSkillBar("css3", $('#css3'));
// 	fillSkillBar("javascript", $('#javascript'));
// 	fillSkillBar("jquery", $('#jquery'));
// 	fillSkillBar("sass", $('#sass'));
// 	fillSkillBar("git", $('#git'));
// }


// //takes preceding image name and generates stars 
// function fillSkillBar(name, $starContainer){
// 	var numStars = skillArrays[name];
// 	for (var j = 0; j < 5; j++){
// 		if (j <= numStars)
// 			$starContainer.append(stars["full"]);
// 		else
// 			$starContainer.append(stars["empty"]);
// 	}
// }

// skillBars();


// //didn't get to use this.  Totally works too.   : (
// //var extractionPattern = /\w{1,15}(?=\.svg)/;
// var extractPattern = /\w{1-15}(?=_skillBar)/

// function skillBars (){


// 	var $allSkills = $("div.skillWrapper"),
// 		$currentSkillBar, 
// 		currentSkillName; //all skill wrappers, each with an img and a div.skillBar


// 	for (var i = 0; i< $allSkills.length; i++){
// 		$currentSkillBar = $($allSkills[i]).children('[class*="skillBar"]'); //gets current skillWrapper
// 		currentSkillName = $currentSkillBar.attr("class");

// 		console.log(currentSkillName);

// 		fillSkillBar(currentSkillName, $currentSkillBar);
// 	}
// }


// skillBars();
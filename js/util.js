function getRandomNum(min, max){
	var range = max - min + 1;
	var rand = Math.random();
	return (min + Math.floor(rand * range));
}

function shuffleArray(array){
	var temp;
	var j;
	for (var i = 0; i < array.length; i++){
		j = getRandomNum(0, array.length - 1);
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	/*
	array.sort(function(){
		return Math.random() > 0.5 ? -1 : 1;
	});
	*/
}

function spinLoading(selector){
	var opts = {
		lines: 13, // The number of lines to draw
		length: 20, // The length of each line
		width: 10, // The line thickness
		radius: 30, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: "#000", // #rgb or #rrggbb
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: "spinner", // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: "30px", // Top position relative to parent in px
		left: "300px" // Left position relative to parent in px
	};
	$(selector).spin(opts);
}

function dynamicProgressBar(selector){
	var broadcastArray = new Array();
	$.getJSON("./data/broadcast.json", function(data){
		$.each(data, function(infoIndex, info){
			broadcastArray.push(info["content"]);
		});
	});
	var progressBarStyleArray = new Array('info', 'success', 'warning', 'danger', 'primary', 'inverse');
	var barWidth = 25;
	var progressBar = function(){
		$(selector).html("<div class='progress progress-" + progressBarStyleArray[getRandomNum(0, progressBarStyleArray.length - 1)]
		           + " progress-striped'><div><div class='bar' style='width: " + barWidth
		           + "%'>" + broadcastArray[getRandomNum(0, broadcastArray.length - 1)]
		           + "</div>");
		barWidth = barWidth + 5;
		if (barWidth > 100){
			barWidth = 25;
		}
	}
	setInterval(progressBar, 500);
}
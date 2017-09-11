$("td").click(placeMarker);
$("#restartButton").click(restartGame);

function placeMarker(eventData) {
	var $clickedBox = $(eventData.target);
	if ($clickedBox.text() == "") {
		$clickedBox.text("X");
	}
}


function restartGame() {
	$("td").empty();
}
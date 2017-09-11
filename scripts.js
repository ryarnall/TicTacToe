$("td").click(playerTurn);
$("#restartButton").click(restartGame);

gameState(1);

function gameState(state) {
	var message = $("p");

	if (state == 1) {
		message.text("Welcome! Place your marker to begin the game");
	} else if (state == 2) {
		message.text("Your turn")
	} else if (state == 3) {
		message.text("Comp turn");
		computerTurn();
	} else if (state == 4) {
		message.text("New game! Place your marker");
	}
}

function randomBox() {
	var random = Math.floor(Math.random()*$("td").length);
	return $("td").eq(random);
}


function playerTurn(eventData) {
	var $clickedBox = $(eventData.target);
	if ($clickedBox.text() == "") {
		$clickedBox.text("X");
		gameState(3);
	}
}

function computerTurn() {
	var aBox = randomBox();
	if (aBox.text() == "") {
		aBox.text("O");
		gameState(2);
	} else {
		computerTurn();
	}
}


function restartGame() {
	$("td").empty();
	gameState(4);
}
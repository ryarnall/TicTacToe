$("#restartButton").click(restartGame);

gameState(1);

//takes in a number that tells if the game is on human turn, a tie, someone won, new game
function gameState(state) {
	var message = $("p");

	if (state == 1) {
		message.text("Welcome! Place your marker to begin the game");
		$("td").on("click", (playerTurn));
	} else if (state == 2) {
		message.text("Your turn")
	} else if (state == 3) {
		computerTurn();
	} else if (state == 4) {
		message.text("New game! Place your marker");
		$("td").on("click", (playerTurn));
	} else if (state == 5) {
		message.text("Its a draw");
		$("td").off("click", (playerTurn));
	} else if (state == 6) {
		message.text("You won!!");
		$("td").off("click", (playerTurn));
	} else if (state == 7) {
		message.text("The computer won");
		$("td").off("click", (playerTurn));
	}
}

//checks if the gameboard is full of pieces or not
function areBoxesFull(state) {
	if ($("td:empty").length == 0) {
		gameState(5);
	} else {
		gameState(state);
	}
}

//checks if there are three in a row of the same letter
function whoWon(player) {
	var a1 = $("#a1").text();
	var a2 = $("#a2").text();
	var a3 = $("#a3").text();

	var b1 = $("#b1").text();
	var b2 = $("#b2").text();
	var b3 = $("#b3").text();

	var c1 = $("#c1").text();
	var c2 = $("#c2").text();
	var c3 = $("#c3").text();

	if (player == "human") {
		if (a1 == "X" && a1 == b1 && b1 == c1 ||
				a2 == "X" && a2 == b2 && b2 == c2 ||
				a3 == "X" && a3 == b3 && b3 == c3 ||
				a1 == "X" && a1 == a2 && a2 == a3 ||
				b1 == "X" && b1 == b2 && b2 == b3 ||
				c1 == "X" && c1 == c2 && c2 == c3 ||
				a1 == "X" && a1 == b2 && b2 == c3 ||
				c1 == "X" && c1 == b2 && b2 == a3) {
			gameState(6);
		} else {
			areBoxesFull(3);
		}
	} else if (player == "computer") {
		if (a1 == "O" && a1 == b1 && b1 == c1 ||
				a2 == "O" && a2 == b2 && b2 == c2 ||
				a3 == "O" && a3 == b3 && b3 == c3 ||
				a1 == "O" && a1 == a2 && a2 == a3 ||
				b1 == "O" && b1 == b2 && b2 == b3 ||
				c1 == "O" && c1 == c2 && c2 == c3 ||
				a1 == "O" && a1 == b2 && b2 == c3 ||
				c1 == "O" && c1 == b2 && b2 == a3) {
			gameState(7);
		} else {
			areBoxesFull(2);
		}
	}
}

//selects a random cell in the game board
function randomBox() {
	var random = Math.floor(Math.random()*$("td").length);
	return $("td").eq(random);
}

//places an "X" in the user-clicked-cell (if its empty)
function playerTurn(eventData) {
	var $clickedBox = $(eventData.target);
	if ($clickedBox.text() == "") {
		$clickedBox.addClass("playerMarker");
		$clickedBox.text("X");
		whoWon("human");
	}
}

//using randomBox(), places an "O" in the given cell (if its empty)
function computerTurn() {
	var aBox = randomBox();
	if (aBox.text() == "") {
		aBox.addClass("computerMarker")
		aBox.text("O");
		whoWon("computer");
	} else {
		computerTurn();
	}
}

//clears the game board
function restartGame() {
	$("td").empty();
	$("td").removeClass();
	gameState(4);
}
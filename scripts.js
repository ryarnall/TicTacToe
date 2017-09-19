$("#restartButton").click(restartGame);

gameState(1);

//takes in a number that tells if the game is on human turn, a tie, someone won, new game
function gameState(state) {
	var message = $("p");

	if (state == 1) {
		message.text("Welcome! Place your marker to begin the game");
		$(".cell").on("click", (playerTurn));
	} else if (state == 2) {
		message.text("")
	} else if (state == 3) {
		computerTurn();
	} else if (state == 4) {
		message.text("New game! Place your marker");
		$(".cell").on("click", (playerTurn));
	} else if (state == 5) {
		message.text("Its a draw");
		$(".cell").off("click", (playerTurn));
	} else if (state == 6) {
		message.text("You won!!");
		$(".cell").off("click", (playerTurn));
	} else if (state == 7) {
		message.text("The computer won");
		$(".cell").off("click", (playerTurn));
	}
}

//checks if the gameboard is full of pieces or not
function areBoxesFull(state) {
	if ($(".cell:empty").length == 0) {
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
	var random = Math.floor(Math.random()*$(".cell").length);
	return $(".cell").eq(random);
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


function computerTurn() {
	var chance = Math.floor(Math.random()*4);

	if (chance == 0) {	
		computerRandom();
	} else {
		computerSmart();
	}


}

//using randomBox(), places an "O" in the given cell (if its empty)
function computerRandom() {
	var aBox = randomBox();
	if (aBox.text() == "") {
		aBox.addClass("computerMarker").text("O");
		whoWon("computer");
	} else {
		computerRandom();
	}
}

function computerSmart() {
	var a1 = $("#a1").text();
	var a2 = $("#a2").text();
	var a3 = $("#a3").text();

	var b1 = $("#b1").text();
	var b2 = $("#b2").text();
	var b3 = $("#b3").text();

	var c1 = $("#c1").text();
	var c2 = $("#c2").text();
	var c3 = $("#c3").text();


	if (a1 == "" && (
				(b1 == "O" && b1 == c1) ||
				(a2 == "O" && a2 == a3) ||
				(b2 == "O" && b2 == c3))) {
		$("#a1").text("O").addClass("computerMarker");
		gameState(7);

	} else if (a2 == "" && (
							(b2 == "O" && b2 == c2) ||
							(a1 == "O" && a1 == a3))) {
		$("#a2").text("O").addClass("computerMarker");
		gameState(7);

	} else if (a3 == "" && (
							(b3 == "O" && b3 == c3) ||
							(a1 == "O" && a1 == a2) ||
							(b2 == "O" && b2 == c1))) {
		$("#a3").text("O").addClass("computerMarker");
		gameState(7);

	} else if (b1 == "" && (
							(a1 == "O" && b1 == c1) ||
							(b2 == "O" && b2 == b3))) {
		$("#b1").text("O").addClass("computerMarker");
		gameState(7);

	} else if (b2 == "" && ( 
							(a2 == "O" && a2 == c2) ||
							(b1 == "O" && b1 == a3) ||
							(a1 == "O" && a1 == c3) ||
							(c1 == "O" && c1 == a3))) {
		$("#b2").text("O").addClass("computerMarker");
		gameState(7);

	} else if (b3 == "" && (
							(a3 == "O" && a3 == c3) ||
							(b1 == "O" && b1 == b2))) {
		$("#b3").text("O").addClass("computerMarker");
		gameState(7);

	} else if (c1 == "" && (
							(a1 == "O" && a1 == b1) ||
							(c2 == "O" && c2 == c3) ||
							(b2 == "O" && b2 == a3))) {
		$("#c1").text("O").addClass("computerMarker");
		gameState(7);

	} else if (c2 == "" && (
							(a2 == "O" && a2 == b2) ||
							(c1 == "O" && c1 == c3))) {
		$("#c2").text("O").addClass("computerMarker");
		gameState(7);

	} else if (c3 == "" && (
							(a3 == "O" && a3 == b3) ||
							(c1 == "O" && c1 == c2))) {
		$("#c3").text("O").addClass("computerMarker");
		gameState(7);

	}	else {
		computerRandom();
	}


}

//clears the game board
function restartGame() {
	$(".cell").empty();
	$(".cell").removeClass("computerMarker playerMarker");
	gameState(4);
}
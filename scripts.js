$("#resetBoardButton").click(resetBoard);
$("#resetScoreButton").click(resetScore);
$("#xButton").click(playerCharX);
$("#oButton").click(playerCharO);


gameState(1);

var playerChar = "X";
var computerChar = "O";

var playerScore = 0;
var computerScore = 0;
$("#playerScore").text("Player: 0");
$("#computerScore").text("Computer: 0");


//takes in a number that tells if the game is on human turn, a tie, someone won, new game
function gameState(state) {
	var message = $("#messageBox");

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
		playerScore += 1;
		$("#playerScore").text("Player:  " + playerScore);
		message.text("You won!!");
		$(".cell").off("click", (playerTurn));
	} else if (state == 7) {
		computerScore += 1;
		$("#computerScore").text("Computer:  " + computerScore);
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
		if (a1 == playerChar && a1 == b1 && b1 == c1 ||
				a2 == playerChar && a2 == b2 && b2 == c2 ||
				a3 == playerChar && a3 == b3 && b3 == c3 ||
				a1 == playerChar && a1 == a2 && a2 == a3 ||
				b1 == playerChar && b1 == b2 && b2 == b3 ||
				c1 == playerChar && c1 == c2 && c2 == c3 ||
				a1 == playerChar && a1 == b2 && b2 == c3 ||
				c1 == playerChar && c1 == b2 && b2 == a3) {
			gameState(6);
		} else {
			areBoxesFull(3);
		}
	} else if (player == "computer") {
		if (a1 == computerChar && a1 == b1 && b1 == c1 ||
				a2 == computerChar && a2 == b2 && b2 == c2 ||
				a3 == computerChar && a3 == b3 && b3 == c3 ||
				a1 == computerChar && a1 == a2 && a2 == a3 ||
				b1 == computerChar && b1 == b2 && b2 == b3 ||
				c1 == computerChar && c1 == c2 && c2 == c3 ||
				a1 == computerChar && a1 == b2 && b2 == c3 ||
				c1 == computerChar && c1 == b2 && b2 == a3) {
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

//places an playerChar in the user-clicked-cell (if its empty)
function playerTurn(eventData) {
	var $clickedBox = $(eventData.target);
	if ($clickedBox.text() == "") {
		$clickedBox.addClass("playerMarker");
		$clickedBox.text(playerChar);
		whoWon("human");
	}
}


function computerTurn() {
	// var chance = Math.floor(Math.random()*4);

	// if (chance == 0) {	
	// 	computerRandom();
	// } else {
	// 	computerSmart();
	// }
	computerSmart();

}

//using randomBox(), places an computerChar in the given cell (if its empty)
function computerRandom() {
	var aBox = randomBox();
	if (aBox.text() == "") {
		aBox.addClass("computerMarker").text(computerChar);
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
				(b1 == computerChar && b1 == c1) ||
				(a2 == computerChar && a2 == a3) ||
				(b2 == computerChar && b2 == c3))) {
		$("#a1").text(computerChar).addClass("computerMarker");
		gameState(7);

	} else if (a2 == "" && (
							(b2 == computerChar && b2 == c2) ||
							(a1 == computerChar && a1 == a3))) {
		$("#a2").text(computerChar).addClass("computerMarker");
		gameState(7);

	} else if (a3 == "" && (
							(b3 == computerChar && b3 == c3) ||
							(a1 == computerChar && a1 == a2) ||
							(b2 == computerChar && b2 == c1))) {
		$("#a3").text(computerChar).addClass("computerMarker");
		gameState(7);

	} else if (b1 == "" && (
							(a1 == computerChar && a1 == c1) ||
							(b2 == computerChar && b2 == b3))) {
		$("#b1").text(computerChar).addClass("computerMarker");
		gameState(7);

	} else if (b2 == "" && ( 
							(a2 == computerChar && a2 == c2) ||
							(b1 == computerChar && b1 == b3) ||
							(a1 == computerChar && a1 == c3) ||
							(c1 == computerChar && c1 == a3))) {
		$("#b2").text(computerChar).addClass("computerMarker");
		gameState(7);

	} else if (b3 == "" && (
							(a3 == computerChar && a3 == c3) ||
							(b1 == computerChar && b1 == b2))) {
		$("#b3").text(computerChar).addClass("computerMarker");
		gameState(7);

	} else if (c1 == "" && (
							(a1 == computerChar && a1 == b1) ||
							(c2 == computerChar && c2 == c3) ||
							(b2 == computerChar && b2 == a3))) {
		$("#c1").text(computerChar).addClass("computerMarker");
		gameState(7);

	} else if (c2 == "" && (
							(a2 == computerChar && a2 == b2) ||
							(c1 == computerChar && c1 == c3))) {
		$("#c2").text(computerChar).addClass("computerMarker");
		gameState(7);

	} else if (c3 == "" && (
							(a3 == computerChar && a3 == b3) ||
							(c1 == computerChar && c1 == c2))) {
		$("#c3").text(computerChar).addClass("computerMarker");
		gameState(7);

	}	else {
		canPlayerWin();
	}
}

function canPlayerWin() {
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
				(b1 == playerChar && b1 == c1) ||
				(a2 == playerChar && a2 == a3) ||
				(b2 == playerChar && b2 == c3))) {
		$("#a1").text(computerChar).addClass("computerMarker");
		whoWon();

	} else if (a2 == "" && (
							(b2 == playerChar && b2 == c2) ||
							(a1 == playerChar && a1 == a3))) {
		$("#a2").text(computerChar).addClass("computerMarker");
		whoWon();

	} else if (a3 == "" && (
							(b3 == playerChar && b3 == c3) ||
							(a1 == playerChar && a1 == a2) ||
							(b2 == playerChar && b2 == c1))) {
		$("#a3").text(computerChar).addClass("computerMarker");
		whoWon();

	} else if (b1 == "" && (
							(a1 == playerChar && a1 == c1) ||
							(b2 == playerChar && b2 == b3))) {
		$("#b1").text(computerChar).addClass("computerMarker");
		whoWon();

	} else if (b2 == "" && ( 
							(a2 == playerChar && a2 == c2) ||
							(b1 == playerChar && b1 == b3) ||
							(a1 == playerChar && a1 == c3) ||
							(c1 == playerChar && c1 == a3))) {
		$("#b2").text(computerChar).addClass("computerMarker");
		whoWon();

	} else if (b3 == "" && (
							(a3 == playerChar && a3 == c3) ||
							(b1 == playerChar && b1 == b2))) {
		$("#b3").text(computerChar).addClass("computerMarker");
		whoWon();

	} else if (c1 == "" && (
							(a1 == playerChar && a1 == b1) ||
							(c2 == playerChar && c2 == c3) ||
							(b2 == playerChar && b2 == a3))) {
		$("#c1").text(computerChar).addClass("computerMarker");
		whoWon();

	} else if (c2 == "" && (
							(a2 == playerChar && a2 == b2) ||
							(c1 == playerChar && c1 == c3))) {
		$("#c2").text(computerChar).addClass("computerMarker");
		whoWon();

	} else if (c3 == "" && (
							(a3 == playerChar && a3 == b3) ||
							(c1 == playerChar && c1 == c2))) {
		$("#c3").text(computerChar).addClass("computerMarker");
		whoWon();

	}	else {
		computerRandom();
	}
}

//clears the game board
function resetBoard() {
	$(".cell").empty();
	$(".cell").removeClass("computerMarker playerMarker");
	gameState(4);
}

function resetScore() {
	playerScore = 0;
	computerScore = 0;
	$("#playerScore").text("Player: 0");
	$("#computerScore").text("Computer: 0");
}

function playerCharX() {
	playerChar = "X";
	computerChar = "O";
	resetBoard();
}

function playerCharO() {
	playerChar = "O";
	computerChar = "X";
	resetBoard();
}



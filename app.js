let isPlayerOneTurn = false;
const playerOneSymbol = "&#9711;";
const playerTwoSymbol = "&#10006;";
let playerSymbol = playerOneSymbol;
let boardPhase = 0;

function changeTurn() {
  let currentTurnText = document.querySelector("#currentTurn");
  isPlayerOneTurn = !isPlayerOneTurn;
  playerSymbol = isPlayerOneTurn ? playerOneSymbol : playerTwoSymbol;
  currentTurnText.innerHTML = isPlayerOneTurn ? `player 1 (${playerSymbol})` : `player 2 (${playerSymbol})`;
}

function checkValidMove() {
  return true;
}

function checkForWin() {}

function clickCell() {
  console.log(this);
  if (checkValidMove) {
    this.innerHTML = `<span>${playerSymbol}</span>`;
    changeTurn();
  }
}

function init() {
  let cells = document.querySelectorAll("td");
  cells.forEach((x) => {
    x.addEventListener("click", clickCell);
  });
  changeTurn();
}

init();

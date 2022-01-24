let isPlayerOneTurn = false;
const playerOneSymbol = "&#9711;";
const playerTwoSymbol = "&#10006;";
let playerSymbol = playerOneSymbol;
let boardPhase = 0;
let tbodys = document.querySelectorAll("tbody");
let currentTable;

function changeTurn() {
  let currentTurnText = document.querySelector("#currentTurn");
  isPlayerOneTurn = !isPlayerOneTurn;
  playerSymbol = isPlayerOneTurn ? playerOneSymbol : playerTwoSymbol;
  currentTurnText.innerHTML = isPlayerOneTurn
    ? `player 1 (${playerSymbol})`
    : `player 2 (${playerSymbol})`;
}

function checkValidMove(currentCell) {
  if (
    currentCell.parentElement.parentElement.dataset.active == "true" &&
    currentCell.innerHTML == ""
  ) {
    return true;
  }
}

function checkForWin() {
  let win = false;
  if (win) {
    boardPhase = 0;
  }
}

function checkBoardPhase(currentCell) {
  //check for diagonal table
  function checkDiag(currentTable, pickedTable) {
    // good
    let pickedRowFromTop = Math.floor((pickedTable - 1) / 4);
    // good
    let currentRowFromTop = Math.floor((currentTable - 1) / 4);
    let pickedNumFromLeft = ((pickedTable - 1) % 4) + 1;
    //
    let currentNumFromLeft = ((currentTable - 1) % 4) + 1;
    let rowfromSource = currentRowFromTop - pickedRowFromTop;
    if (
      currentNumFromLeft == pickedNumFromLeft + rowfromSource ||
      currentNumFromLeft == pickedNumFromLeft - rowfromSource
    ) {
      return true;
    } else return false;
  }

  currentTable = currentCell.parentElement.parentElement;
  if (boardPhase != 2) {
    if (boardPhase == 0) {
      let tableNo = Number(currentTable.dataset.count);
      tbodys.forEach((x, i) => {
        if (
          //check row
          (x.dataset.count > tableNo - 1 - ((tableNo - 1) % 4) &&
            x.dataset.count <= tableNo - 1 + (4 - ((tableNo - 1) % 4))) ||
          //check collumn
          (x.dataset.count - tableNo) % 4 == 0 ||
          //check diagonal
          checkDiag(x.dataset.count, tableNo)
        ) {
          x.setAttribute("data-active", "true");
        } else {
          x.setAttribute("data-active", "false");
        }
      });
      boardPhase++;
    } else {
      boardPhase++;
    }
  }
}

function clickCell() {
  if (checkValidMove(this)) {
    checkBoardPhase(this);
    this.innerHTML = `<span>${playerSymbol}</span>`;
    checkForWin();
    changeTurn();
  }
}

function init() {
  let cells = document.querySelectorAll("td");
  cells.forEach((x) => {
    x.addEventListener("click", clickCell);
  });
  tbodys.forEach((x, i) => {
    x.setAttribute("data-count", i + 1);
    x.setAttribute("data-active", "true");
  });
  changeTurn();
}

init();

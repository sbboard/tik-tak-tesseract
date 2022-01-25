let isPlayerOneTurn = false;
const playerOneSymbol = "&#9711;";
const playerTwoSymbol = "&#10006;";
let playerSymbol = playerOneSymbol;
let tbodys = document.querySelectorAll("tbody");
let activeTables = [];

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
    activeTables = [];
  }
}

function checkBoardPhase(currentCell) {
  //check for diagonal table
  function checkDiag(currentTable, pickedTable) {
    const allowedDiags = [1, 4, 6, 7, 10, 11, 13, 16];
    let pickedRowFromTop = Math.floor((pickedTable - 1) / 4);
    let currentRowFromTop = Math.floor((currentTable - 1) / 4);
    let pickedNumFromLeft = ((pickedTable - 1) % 4) + 1;
    let currentNumFromLeft = ((currentTable - 1) % 4) + 1;
    let rowfromSource = currentRowFromTop - pickedRowFromTop;
    if (
      (currentNumFromLeft == pickedNumFromLeft + rowfromSource ||
        currentNumFromLeft == pickedNumFromLeft - rowfromSource) &&
      allowedDiags.indexOf(Number(currentTable)) != -1 &&
      allowedDiags.indexOf(Number(pickedTable)) != -1
    ) {
      return true;
    } else return false;
  }

  if (activeTables.length < 2) {
    let currentTable = currentCell.parentElement.parentElement;
    let tableNo = Number(currentTable.dataset.count);
    if (activeTables.length == 0) {
      activeTables.push(tableNo);
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
    } else {
      if (activeTables.indexOf(currentTable) == -1) {
        activeTables.push(tableNo);
        //is row
        if (
          Math.floor((activeTables[0] - 1) / 4) ==
          Math.floor((activeTables[1] - 1) / 4)
        ) {
          tbodys.forEach((x, i) => {
            if (
              Math.floor((activeTables[0] - 1) / 4) !=
              Math.floor((x.dataset.count - 1) / 4)
            ) {
              x.setAttribute("data-active", "false");
            }
          });
        }
        //is column
        else if (activeTables[0] % 4 == activeTables[1] % 4) {
          tbodys.forEach((x, i) => {
            if (activeTables[0] % 4 != x.dataset.count % 4) {
              x.setAttribute("data-active", "false");
            }
          });
        } else {
          const diagOne = [1, 6, 11, 16];
          const diagTwo = [4, 7, 10, 13];
          let dataSet =
            diagOne.indexOf(activeTables[0]) == -1 ? diagTwo : diagOne;
          tbodys.forEach((x, i) => {
            if (dataSet.indexOf(Number(x.dataset.count)) == -1) {
              x.setAttribute("data-active", "false");
            }
          });
        }
      }
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

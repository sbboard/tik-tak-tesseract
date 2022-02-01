let isPlayerOneTurn = false;
const playerOneSymbol = "◯";
const playerTwoSymbol = "✖";
let playerSymbol = playerOneSymbol;
let tbodys = document.querySelectorAll("tbody");
let activeTables = [];
let finishedTables = [];
let testDummy;

function changeTurn() {
  let currentTurnText = document.querySelector("#currentTurn");
  isPlayerOneTurn = !isPlayerOneTurn;
  playerSymbol = isPlayerOneTurn ? playerOneSymbol : playerTwoSymbol;
  currentTurnText.innerHTML = isPlayerOneTurn
    ? `player ${playerSymbol}`
    : `player ${playerSymbol}`;
}

function checkValidMove(currentCell) {
  if (
    currentCell.parentElement.parentElement.dataset.active == "true" &&
    currentCell.innerHTML == ""
  ) {
    return true;
  }
}

function checkForWin(clickedCell) {
  let win = false;

  //clickedCell variables
  //index of clicked within its own table
  const indexOfClicked = [
    ...clickedCell.parentElement.parentElement.querySelectorAll("td"),
  ].indexOf(clickedCell);
  const collumnPosition = indexOfClicked % 4;
  const allCellsInTable =
    clickedCell.parentElement.parentElement.querySelectorAll("td");

  testDummy = clickedCell;

  //same board | horizontal
  if (
    Array.from(clickedCell.parentElement.children).filter((x) => {
      return x.outerText == playerSymbol;
    }).length == 4
  ) {
    win = true;
    console.log("horizontal win");
  }
  //same board | vertical
  else if (
    allCellsInTable[collumnPosition % 4].innerHTML ==
      allCellsInTable[(collumnPosition % 4) + 4].innerHTML &&
    allCellsInTable[(collumnPosition % 4) + 4].innerHTML ==
      allCellsInTable[(collumnPosition % 4) + 4 * 2].innerHTML &&
    allCellsInTable[(collumnPosition % 4) + 4 * 2].innerHTML ==
      allCellsInTable[(collumnPosition % 4) + 4 * 3].innerHTML
  ) {
    win = true;
    console.log("vertical win");
  }

  //win
  if (win) {
    if (isPlayerOneTurn) {
      document.querySelector("#p1-points").innerHTML =
        Number(document.querySelector("#p1-points").innerHTML) + 1;
    } else {
      document.querySelector("#p2-points").innerHTML =
        Number(document.querySelector("#p2-points").innerHTML) + 1;
    }
    resetBoard();
  } else {
    //check for draw
    if (
      document.querySelectorAll("[data-active='true'] td").length ==
      document.querySelectorAll("[data-active='true'] td span").length
    ) {
      resetBoard();
    }
  }
}

function resetBoard() {
  activeTables = [];
  let oldBoard = document.querySelectorAll("tbody[data-active='true']");
  oldBoard.forEach((x) => {
    if (x.innerText.trim().length > 0) {
      x.classList.add("played");
    }
  });
  tbodys.forEach((x) => {
    if (x.classList.contains("played")) {
      x.setAttribute("data-active", "false");
    } else {
      x.setAttribute("data-active", "true");
    }
  });
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
          x.classList.contains("played") == false &&
          //check row
          ((x.dataset.count > tableNo - 1 - ((tableNo - 1) % 4) &&
            x.dataset.count <= tableNo - 1 + (4 - ((tableNo - 1) % 4))) ||
            //check collumn
            (x.dataset.count - tableNo) % 4 == 0 ||
            //check diagonal
            checkDiag(x.dataset.count, tableNo))
        ) {
          x.setAttribute("data-active", "true");
        } else {
          x.setAttribute("data-active", "false");
        }
      });
    } else {
      if (activeTables.indexOf(tableNo) == -1) {
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
    checkForWin(this);
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

///////////////////// CONSTANTS /////////////////////////////////////

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

///////////////////// APP STATE (VARIABLES) /////////////////////////

let board;
let turn = "X";
let win;
let xScore= 0;
let oScore = 0;
let tieScore = 0;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////

const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

///////////////////// EVENT LISTENERS ///////////////////////////////

window.onload = init;
document.getElementById("firstX").onclick = firstX;
document.getElementById("firstO").onclick = firstO;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("firstX").onclick = init2;
document.getElementById("firstO").onclick = init3;
///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = turn;
  win = null;

  render();
}
function init2() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  win = null;

  render();
}
function init3() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "O";
  win = null;

  render();
}

function firstX(){
  document.getElementById("change").innerHTML = "Turn: X";
  turn = "X";

}
function firstO(){
  document.getElementById("change").innerHTML = "Turn: O";
  turn = "O";
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();

      render();
    }
    if (win === "T") {
      tieScore++;
      document.getElementById("thirdList").innerHTML = tieScore;
    }
  }
}

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
      if(winner === "X"){
        xScore++;
        document.getElementById("firstList").innerHTML = xScore;
      }
      if(winner === "O"){
        oScore++;
        document.getElementById("secondList").innerHTML = oScore;
      }
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}


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
let turn;
let win;
let xWins = 0;
let oWins = 0;
let ties = 0;
let starter = "X";

///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");   // grab the subheader
const victoryAudio = document.getElementById("victory-audio");

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("change-order-button").onclick = changeOrder;
document.getElementById("reset-score-button").onclick = resetScore;

///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  board = [
      "", "", "",
      "", "", "",
      "", "", ""
  ];

  turn = "X";
  win = null;

  render();
  victoryAudio.pause();
  victoryAudio.currentTime = 0;
}

function render() {
  board.forEach(function(mark, index) {
      squares[index].textContent = mark;
  });

  message.textContent = win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
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
      if (win === "X") {
          xWins++;
          document.getElementById("x-wins").innerHTML = xWins;
          victoryAudio.play();
      }
      else if (win === "O") {
          oWins++;
          document.getElementById("o-wins").innerHTML = oWins;
          victoryAudio.play();
      }
      else if (win === "T") {
          ties++;
          document.getElementById("ties").innerHTML = ties;
      }

      render();
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
      }
  });

  return winner ? winner : board.includes("") ? null : "T";
}

function changeOrder() {
  init();
  if (starter === "X") {
      turn = "O";
      starter = "O";
  }
  else {
      turn = "X";
      starter = "X"
  }
  document.getElementById("change-order-button").innerHTML = starter;
  render();
}

function resetScore() {
  xWins = 0;
  oWins = 0;
  ties = 0;

  document.getElementById("x-wins").innerHTML = xWins;
  document.getElementById("o-wins").innerHTML = oWins;
  document.getElementById("ties").innerHTML = ties;
}

///////////////////// CONSTANTS /////////////////////////////////////

///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let win;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;

///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];
  turn = "X";
  win = null;

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
    }
    if (board[index] === "") {
        board[index] = turn;
        turn = turn === "X" ? "O" : "X";
        win = getWinner();

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

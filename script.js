// target/select query
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

// conditions to win
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle cell click
function handleCellClick(index) {
  if (gameBoard[index] || !isGameActive) return;

  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  checkWinner();
}

// Check for winner or draw
function checkWinner() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] === "" || gameBoard[b] === "" || gameBoard[c] === "")
      continue;

    if (gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    message.textContent = `Player ${currentPlayer} Wins!`;
    isGameActive = false;
    return;
  }

  if (!gameBoard.includes("")) {
    message.textContent = "It's a Draw!";
    isGameActive = false;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Restart game
function restartGame() {
  isGameActive = true;
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  message.textContent = "";
  cells.forEach((cell) => {
    cell.textContent = "";
  });
}

// Event listeners
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(index));
});

restartButton.addEventListener("click", restartGame);

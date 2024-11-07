const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let boardState = Array(9).fill(null);
let gameActive = true;

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

// Handle cell clicks for player move
function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");

  // Ignore clicks if cell is already filled or game is over
  if (boardState[index] || !gameActive || currentPlayer === "O") return;

  // Player's move
  playerMove(index);

  // AI's move if the game is still active
  if (gameActive) {
    setTimeout(aiMove, 500); // AI moves after a short delay for effect
  }
}

function playerMove(index) {
  boardState[index] = "X";
  cells[index].textContent = "X";
  if (checkWin("X")) {
    gameActive = false;
    setTimeout(() => alert("Player wins!"), 100);
  } else if (boardState.every(cell => cell)) {
    gameActive = false;
    setTimeout(() => alert("It's a draw!"), 100);
  }
}

function aiMove() {
  let availableMoves = boardState
    .map((value, index) => (value === null ? index : null))
    .filter(val => val !== null);

  if (availableMoves.length === 0) return;

  // Simple AI move (can be improved with minimax)
  const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  boardState[randomIndex] = "O";
  cells[randomIndex].textContent = "O";

  if (checkWin("O")) {
    gameActive = false;
    setTimeout(() => alert("AI wins!"), 100);
  } else if (boardState.every(cell => cell)) {
    gameActive = false;
    setTimeout(() => alert("It's a draw!"), 100);
  }

  currentPlayer = "X"; // Switch back to player
}

// Check for win
function checkWin(player) {
  return winningConditions.some(combination => {
    return combination.every(index => boardState[index] === player);
  });
}

// Restart the game
function restartGame() {
  boardState = Array(9).fill(null);
  cells.forEach(cell => (cell.textContent = ""));
  currentPlayer = "X";
  gameActive = true;
}

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);

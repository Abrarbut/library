const gameBoard = document.getElementById("gameBoard");
const boxes = document.querySelectorAll(".grid-item");
const statusDiv = document.getElementById("status");
const resetButton = document.getElementById("resetButton");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Check for winner
function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// Handle box click
function handleBoxClick(event) {
  const box = event.target;
  const index = Array.from(boxes).indexOf(box);

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  box.textContent = currentPlayer;
  box.classList.add(currentPlayer.toLowerCase());

  const winner = checkWinner();
  if (winner) {
    statusDiv.textContent = `Player ${winner} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (board.every((cell) => cell !== "")) {
    statusDiv.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDiv.textContent = `Player ${currentPlayer}'s Turn`;
}

// Reset game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusDiv.textContent = `Player ${currentPlayer}'s Turn`;
  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("x", "o");
  });
}

// Add click listeners to boxes
boxes.forEach((box) => box.addEventListener("click", handleBoxClick));

// Reset button
resetButton.addEventListener("click", resetGame);

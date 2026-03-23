const rps = {
  playerScore1: 0,
  playerScore2: 0,
  playRound(player1Choice, player2Choice) {
    // Compare two player choices
    if (player1Choice === player2Choice) {
      return "It's a tie!";
    } else if (
      (player1Choice === "rock" && player2Choice === "scissors") ||
      (player1Choice === "paper" && player2Choice === "rock") ||
      (player1Choice === "scissors" && player2Choice === "paper")
    ) {
      this.playerScore1++;
      return `Player 1 wins! ${player1Choice} beats ${player2Choice}.`;
    } else {
      this.playerScore2++;
      return `Player 2 wins! ${player2Choice} beats ${player1Choice}.`;
    }

  },
};

// Get user input and play
const playerInput1 = prompt("Player 1 - Enter your choice (rock, paper, or scissors):");
const playerInput2 = prompt("Player 2 - Enter your choice (rock, paper, or scissors):");

// if (playerInput1 && playerInput2) {
//   console.log(rps.playRound(playerInput1.toLowerCase(), playerInput2.toLowerCase()));
// }

// console.log(`Player Score: ${rps.playerScore1}, Player Score: ${rps.playerScore2}`);

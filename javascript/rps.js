const rps = {
  playerScore: 0,
  computerScore: 0,
  playRound(playerChoice) {
    // code to play the round, update score if needed, then return the result
    const choices = ["rock", "paper", "scissors"];
    // const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    

    if (playerInput1 === playerInput2) {
      return "It's a tie!";
    } else if (
      (playerInput1 === "rock" && playerInput2 === "scissors") ||
      (playerInput1 === "paper" && playerInput2 === "rock") ||
      (playerInput1 === "scissors" && playerInput2 === "paper")
    ) {
      this.playerScore++;
      return `You win! ${playerInput1} beats ${playerInput2}.`;
    } else {
      this.computerScore++;
      return `You lose! ${playerInput1} beats ${playerInput2}.`;
    }

  },
};

// Get user input and play
const playerInput1 = prompt("Enter your choice (rock, paper, or scissors):");
if (playerInput1) {
  console.log(rps.playRound(playerInput1.toLowerCase()));
}
const playerInput2 = prompt("Enter your choice (rock, paper, or scissors):");
if (playerInput2) {
  console.log(rps.playRound(playerInput2.toLowerCase()));
}

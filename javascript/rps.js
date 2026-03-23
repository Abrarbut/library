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

// Get HTML elements
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const playButton = document.getElementById("playButton");
const resultDiv = document.getElementById("result");

// Add click event to button
playButton.addEventListener("click", function() {
  const choice1 = player1Input.value.toLowerCase();
  const choice2 = player2Input.value.toLowerCase();
  
  if (choice1 && choice2) {
    const result = rps.playRound(choice1, choice2);
    resultDiv.innerHTML = `
      <p>${result}</p>
      <p>Player 1 Score: ${rps.playerScore1} | Player 2 Score: ${rps.playerScore2}</p>
    `;
    
    // Clear input fields
    player1Input.value = "";
    player2Input.value = "";
  } else {
    resultDiv.innerHTML = "<p style='color: red;'>Please enter both choices!</p>";
  }
});

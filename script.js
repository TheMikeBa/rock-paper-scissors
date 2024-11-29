console.log('hi');

// Create array of choices
const choices = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
  // Generate random choices evenly selected between 3 options
  const choice = Math.floor(Math.random() * 3);
  //   Log computer choice
  console.log(`Your opponent selected ${choices[choice]}`);
  // Return string to console with image of random choice
  return choice;
}

function getPlayerChoice() {
  //   Prompt user for selection. trim and lowerCase selection
  const choice = prompt('Rock, Paper, Scissors?').trim().toLowerCase();
  //   Log user's choice to console and return user's choice
  if (choice === 'rock') {
    console.log(`You selected ${choices[0]}`);
    return 0;
  } else if (choice === 'paper') {
    console.log(`You selected ${choices[1]}`);
    return 1;
  } else if (choice === 'scissors' || choice === 'scissor') {
    console.log(`You selected ${choices[2]}`);
    return 2;
  } else {
    console.warn(
      'Invalid input. Please select either rock, paper, or scissors.'
    );
    return getPlayerChoice();
  }
}

function playRound() {
  const playerSelection = getPlayerChoice();
  const computerSelection = getComputerChoice();

  const computerWin =
    (playerSelection === 0 && computerSelection === 1) ||
    (playerSelection === 1 && computerSelection === 2) ||
    (playerSelection === 2 && computerSelection === 0);
  const tie = playerSelection === computerSelection;
  if (tie) {
    console.log(`It's a tie`);
    return;
  }
  if (computerWin) {
    console.log(`Opponent wins`);
    return 1;
  }
  console.log(`You win`);
  return 2;
}

let playerScore = 0;
let computerScore = 0;

function playGame() {
  if (playerScore < 3 && computerScore < 3) {
    const round = playRound();
    if (round === 1) computerScore++;
    if (round === 2) playerScore++;
    console.log(
      `The score is
      You ${playerScore}
      Opponent ${computerScore}`
    );
    playGame();
  }
  playerScore > computerScore
    ? console.log(`You won best out of 5.`)
    : console.log(`Your opponent won best out of 5.`);
}

playGame();

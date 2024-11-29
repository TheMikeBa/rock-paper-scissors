// Create array of choices
const choices = ['rock', 'paper', 'scissors'];
const choiceEmojis = ['🪨', '📄', '✂️'];

// Get DOM elements
const buttons = document.querySelectorAll('.choice-btn');
const messages = document.getElementById('messages');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const playerChoiceEmoji = document.querySelector('.player-choice');
const computerChoiceEmoji = document.querySelector('.computer-choice');

let playerScore = 0;
let computerScore = 0;
let gameInProgress = true;
let firstMove = true;

// Clear initial emoji content
playerChoiceEmoji.textContent = '';
computerChoiceEmoji.textContent = '';

function getComputerChoice() {
  const choice = Math.floor(Math.random() * 3);
  return choice;
}

function displayMessage(message, isWelcome = false) {
  messages.textContent = message;
  messages.className = (isWelcome && firstMove) ? 'welcome-message' : '';
}

// Display welcome message when game loads
displayMessage('Choose your weapon! 🪨 📄 ✂️', true);

function updateScores() {
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
}

function startBattle(playerChoice, computerChoice) {
  // Clear any existing classes
  playerChoiceEmoji.className = 'choice-emoji player-choice';
  computerChoiceEmoji.className = 'choice-emoji computer-choice';
  
  // Update emoji content
  playerChoiceEmoji.textContent = choiceEmojis[playerChoice];
  computerChoiceEmoji.textContent = choiceEmojis[computerChoice];

  // Trigger slide-in animations
  requestAnimationFrame(() => {
    playerChoiceEmoji.classList.add('slide-in-left');
    computerChoiceEmoji.classList.add('slide-in-right');
  });
  
  // Start battle animations after slide-in
  setTimeout(() => {
    playerChoiceEmoji.classList.add('battle-left');
    computerChoiceEmoji.classList.add('battle-right');
  }, 500);
  
  // Show result immediately
  const result = determineWinner(playerChoice, computerChoice);
  displayMessage(result);
  
  if (gameInProgress) {
    setTimeout(() => {
      displayMessage('Choose your next move! 🪨 📄 ✂️', true);
    }, 1500);
  }
}

function determineWinner(playerChoice, computerChoice) {
  const computerWin =
    (playerChoice === 0 && computerChoice === 1) ||
    (playerChoice === 1 && computerChoice === 2) ||
    (playerChoice === 2 && computerChoice === 0);
  const tie = playerChoice === computerChoice;

  if (tie) {
    return "It's a tie! Play again!";
  }
  if (computerWin) {
    computerScore++;
    updateScores();
    return 'Opponent wins!';
  } else {
    playerScore++;
    updateScores();
    return 'You win!';
  }
}

function play(playerSelection) {
  if (!gameInProgress) return;
  
  firstMove = false;
  const computerSelection = getComputerChoice();
  
  // Clear emojis by removing them from view
  playerChoiceEmoji.className = 'choice-emoji player-choice';
  computerChoiceEmoji.className = 'choice-emoji computer-choice';
  
  // Small delay before starting new battle to allow for clear animation
  setTimeout(() => {
    startBattle(playerSelection, computerSelection);
  }, 50);

  if (playerScore === 3 || computerScore === 3) {
    gameInProgress = false;
    setTimeout(() => {
      const finalMessage = playerScore > computerScore
        ? 'Congratulations! You\'re the first to 3 wins!'
        : 'Sorry, but your opponent was the first to 3 wins.';
      displayMessage(finalMessage);
    }, 1500);
  }
}

// Add click handlers to buttons
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (gameInProgress) {
      play(index);
    }
  });
});

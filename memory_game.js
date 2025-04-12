const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H"];
let alphabetPairs, cardStates, flippedCards, lockBoard, score;

const cards = document.querySelectorAll(".card");
const scoreDisplay = document.getElementById("score"); // Add a score display element in your HTML
const resetButton = document.getElementById("reset"); // Add a reset button in your HTML

function initializeGame() {
  alphabetPairs = [...alphabets, ...alphabets].sort(() => 0.5 - Math.random());
  cardStates = Array.from(cards).map((_, i) => ({
    alphabet: alphabetPairs[i],
    isflipped: false,
    ismatched: false,
  }));
  flippedCards = [];
  lockBoard = false;
  score = 0;

  // Reset the UI
  cards.forEach((card, i) => {
    card.classList.remove("flipped");
    card.textContent = "";
  });
  scoreDisplay.textContent = `Score: ${score}`;
}

function updateScore(points) {
  score += points;
  scoreDisplay.textContent = `Score: ${score}`;
}

cards.forEach((card, i) => {
  card.addEventListener("click", () => {
    if (lockBoard || cardStates[i].isflipped || cardStates[i].ismatched || flippedCards.length === 2) return;

    cardStates[i].isflipped = true;
    card.classList.add("flipped");
    card.textContent = cardStates[i].alphabet;
    flippedCards.push({ index: i, element: card });

    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cardStates[first.index].alphabet === cardStates[second.index].alphabet) {
        cardStates[first.index].ismatched = true;
        cardStates[second.index].ismatched = true;
        flippedCards = [];
        updateScore(10); // Increase score for a match
      } else {
        lockBoard = true;
        setTimeout(() => {
          cardStates[first.index].isflipped = false;
          cardStates[second.index].isflipped = false;
          first.element.classList.remove("flipped");
          second.element.classList.remove("flipped");
          first.element.textContent = "";
          second.element.textContent = "";
          flippedCards = [];
          lockBoard = false;
        }, 1000);
      }
    }
  });
});

// Reset button functionality
resetButton.addEventListener("click", initializeGame);

// Initialize the game on page load
initializeGame();


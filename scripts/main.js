const flipMatchCardsContainer = document.querySelector('.flip-match-cards-themselves');
const nextButton = document.getElementById('nextButton');
const startGameButton = document.getElementById('startGameButton');
const cardsCountArray = ['4','9','16','25'];
const flipMatchCardsContainerGrid = ['2','3','4','5'];
const cardsImages = ['../assets/pictures/nature/nature-one.jpg','../assets/pictures/nature/nature-one.jpg','../assets/pictures/nature/nature-two.jpg','../assets/pictures/nature/nature-two.jpg'];
let levelCounter = 0;

// START THE GAME

function startTheGame() {
    for (let i = 0; i < cardsCountArray[levelCounter]; i++) {
        flipMatchCardsContainer.innerHTML += `
            <button type="button" value="nature-one" class="flip-match-card-itself">
                <div class="flip-match-card-itself-image">
                    <img class="flip-match-card-itself-image-itself" src="${cardsImages[i]}">
                </div>
            </button>
        `;
    };
};

nextButton.addEventListener('click', () => {
    levelCounter++;
    flipMatchCardsContainer.style.gridTemplateColumns = `repeat(${flipMatchCardsContainerGrid[levelCounter]}, 1fr)`;
    flipMatchCardsContainer.style.gridTemplateRows = `repeat(${flipMatchCardsContainerGrid[levelCounter]}, 1fr)`;
    flipMatchCardsContainer.innerHTML = null;
    startTheGame();
    if (levelCounter === cardsCountArray.length - 1) {
        nextButton.disabled = true;
    };
});


// INITIALIZING BUTTONS

startGameButton.addEventListener('click', startTheGame);
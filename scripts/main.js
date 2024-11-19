const flipMatchCardsContainer = document.querySelector('.flip-match-cards-themselves');
const nextButton = document.getElementById('nextButton');
const startGameButton = document.getElementById('startGameButton');
const cardsCountArray = ['4','9','16','25'];
const flipMatchCardsContainerGrid = ['2','3','4','5'];
const cardsImages = ['../assets/pictures/nature/nature-one.jpg','../assets/pictures/nature/nature-one.jpg','../assets/pictures/nature/nature-two.jpg','../assets/pictures/nature/nature-two.jpg', '../assets/pictures/nature/nature-three.jpg','../assets/pictures/nature/nature-three.jpg','../assets/pictures/nature/nature-four.jpg','../assets/pictures/nature/nature-four.jpg','../assets/pictures/nature/nature-five.jpg','../assets/pictures/nature/nature-five.jpg','../assets/pictures/nature/nature-six.jpg','../assets/pictures/nature/nature-six.jpg','../assets/pictures/nature/nature-seven.jpg','../assets/pictures/nature/nature-seven.jpg','../assets/pictures/nature/nature-eight.jpg','../assets/pictures/nature/nature-eight.jpg'];
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

    // DISABLING THE NEXT BUTTON WHEN LEVEL IS EQUAL TO THE LAST LEVEL OF THE GAME
    if (levelCounter === cardsCountArray.length - 1) {
        nextButton.disabled = true;
        for (const flipMatchItself of flipMatchCardsContainer.children) {
            flipMatchItself.style.padding = '2px 3px';
        };
    };
});


// INITIALIZING BUTTONS

startGameButton.addEventListener('click', startTheGame);
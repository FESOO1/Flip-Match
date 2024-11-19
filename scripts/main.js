const flipMatchCardsContainer = document.querySelector('.flip-match-cards-themselves');
const nextButton = document.getElementById('nextButton');
const startGameButton = document.getElementById('startGameButton');
const cardsCountArray = ['4','8','16','24'];
const flipMatchCardsContainerGrid = ['2','3','4','5'];
const natureCardValues = ['nature-one','nature-one','nature-two','nature-two','nature-three','nature-three','nature-four','nature-four','nature-five','nature-five','nature-six','nature-six','nature-seven','nature-seven','nature-eight','nature-eight','nature-nine','nature-nine','nature-ten','nature-ten','nature-eleven','nature-eleven','nature-twelve','nature-twelve']
const natureCardImages = ['../assets/pictures/nature/nature-one.jpg','../assets/pictures/nature/nature-one.jpg','../assets/pictures/nature/nature-two.jpg','../assets/pictures/nature/nature-two.jpg', '../assets/pictures/nature/nature-three.jpg','../assets/pictures/nature/nature-three.jpg','../assets/pictures/nature/nature-four.jpg','../assets/pictures/nature/nature-four.jpg','../assets/pictures/nature/nature-five.jpg','../assets/pictures/nature/nature-five.jpg','../assets/pictures/nature/nature-six.jpg','../assets/pictures/nature/nature-six.jpg','../assets/pictures/nature/nature-seven.jpg','../assets/pictures/nature/nature-seven.jpg','../assets/pictures/nature/nature-eight.jpg','../assets/pictures/nature/nature-eight.jpg','../assets/pictures/nature/nature-nine.jpg','../assets/pictures/nature/nature-nine.jpg','../assets/pictures/nature/nature-ten.jpg','../assets/pictures/nature/nature-ten.jpg','../assets/pictures/nature/nature-eleven.jpg','../assets/pictures/nature/nature-eleven.jpg','../assets/pictures/nature/nature-twelve.jpg','../assets/pictures/nature/nature-twelve.jpg'];
let levelCounter = 0;
let cardCliked = 0;

// START THE GAME

function startTheGame() {
    for (let i = 0; i < cardsCountArray[levelCounter]; i++) {
        flipMatchCardsContainer.innerHTML += `
            <button type="button" value="${natureCardValues[i]}" class="flip-match-card-itself">
                <div class="flip-match-card-itself-image">
                    <img class="flip-match-card-itself-image-itself" src="${natureCardImages[i]}">
                </div>
            </button>
        `;


        // HANDLING THE FLIPPING CARDS
        const flipMatchCardItself = document.querySelectorAll('.flip-match-card-itself');
        
        for (let i = 0; i < flipMatchCardItself.length; i++) {
            flipMatchCardItself[i].addEventListener('click', () => {
                cardCliked++;
                flipMatchCardItself[i].classList.add('flip-match-card-itself-flipped');
                if (cardCliked === 2) {

                };
            });
        };
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
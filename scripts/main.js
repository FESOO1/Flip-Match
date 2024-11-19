const flipMatchCardsContainer = document.querySelector('.flip-match-cards-themselves');
const startGameButton = document.getElementById('startGameButton');
const cardsCountArray = ['4','8','16','24'];
const flipMatchCardsContainerGrid = ['2','3','4','5'];
const foundMatches = ['2','4','8','12'];
let foundMatchesCounter = 0;
const natureCardValues = ['nature-one','nature-one','nature-two','nature-two','nature-three','nature-three','nature-four','nature-four','nature-five','nature-five','nature-six','nature-six','nature-seven','nature-seven','nature-eight','nature-eight','nature-nine','nature-nine','nature-ten','nature-ten','nature-eleven','nature-eleven','nature-twelve','nature-twelve']
const natureCardImages = ['../assets/pictures/nature/nature-one.jpg','../assets/pictures/nature/nature-one.jpg','../assets/pictures/nature/nature-two.jpg','../assets/pictures/nature/nature-two.jpg', '../assets/pictures/nature/nature-three.jpg','../assets/pictures/nature/nature-three.jpg','../assets/pictures/nature/nature-four.jpg','../assets/pictures/nature/nature-four.jpg','../assets/pictures/nature/nature-five.jpg','../assets/pictures/nature/nature-five.jpg','../assets/pictures/nature/nature-six.jpg','../assets/pictures/nature/nature-six.jpg','../assets/pictures/nature/nature-seven.jpg','../assets/pictures/nature/nature-seven.jpg','../assets/pictures/nature/nature-eight.jpg','../assets/pictures/nature/nature-eight.jpg','../assets/pictures/nature/nature-nine.jpg','../assets/pictures/nature/nature-nine.jpg','../assets/pictures/nature/nature-ten.jpg','../assets/pictures/nature/nature-ten.jpg','../assets/pictures/nature/nature-eleven.jpg','../assets/pictures/nature/nature-eleven.jpg','../assets/pictures/nature/nature-twelve.jpg','../assets/pictures/nature/nature-twelve.jpg'];
let levelCounter = 0;
let cardCliked = 0;
let savedValues = [];
let isPlaying = false;

// RESULT MENU VARIABLES
const prevLevelButton = document.getElementById('prevLevelButton');
const nextLevelButton = document.getElementById('nextLevelButton');
const replayLevelButton = document.getElementById('replayLevelButton');
const flipMatchResultHeader = document.querySelector('.flip-match-result-screen-header');
const flipMatchResultScreenContainer = document.querySelector('.flip-match-result-screen');
const flipMatchResultHeaderArray = ['Congratulations! You Won!','Victory Achieved! Get Ready for the Next Level.','Level Up! On to the Next Challenge.','Final Stage Conquered!'];

// CONTROLS VARIABLES

const flipMatchControlsContainer = document.querySelector('.flip-match-controls');
const modesButton = document.getElementById('modesButton');
const flipMatchModeButtonContainer = document.querySelector('.flip-match-control-mode-button-container');

// START THE GAME

function startTheGame() {
    isPlaying = true;

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
                savedValues.push(flipMatchCardItself[i].value);
                if (cardCliked === 2) {
                    if (savedValues[0] === flipMatchCardItself[i].value) {
                        /* console.log('Found'); */
                        cardCliked = 0;
                        savedValues = [];
                        for (const flipMatchCardItselfs of flipMatchCardsContainer.children) {
                            if (flipMatchCardItselfs.classList.contains('flip-match-card-itself-flipped')) {
                                flipMatchCardItselfs.classList.remove('flip-match-card-itself');
                                flipMatchCardItselfs.classList.remove('flip-match-card-itself-flipped');
                                flipMatchCardItselfs.classList.add('flip-match-card-itself-found');
                            };
                        };
                        foundMatchesCounter++;
                        if (foundMatchesCounter === Number.parseInt(foundMatches[levelCounter], 10)) {
                            isPlaying = false;
                            setTimeout(() => {
                                flipMatchResultScreenContainer.classList.add('flip-match-result-screen-active');
                                foundMatchesCounter = 0;
                            }, 300);
                        };
                    } else {
                        /* console.log('Not Found'); */
                        cardCliked = 0;
                        savedValues = [];
                        setTimeout(() => {
                            for (const flipMatchCardItselfs of flipMatchCardItself) {
                                flipMatchCardItselfs.classList.remove('flip-match-card-itself-flipped');  
                            };   
                        }, 500);                
                    };
                };
            });
        };
    };
};


// RESULT MENU FUNCTION

function replayLevelFunction() {
    flipMatchCardsContainer.style.gridTemplateColumns = `repeat(${flipMatchCardsContainerGrid[levelCounter]}, 1fr)`;
    flipMatchCardsContainer.style.gridTemplateRows = `repeat(${flipMatchCardsContainerGrid[levelCounter]}, 1fr)`;
    flipMatchCardsContainer.innerHTML = null;
    startTheGame();

    // RESULT MENU
    flipMatchResultScreenContainer.classList.remove('flip-match-result-screen-active');
};

function nextLevelFunction() {
    levelCounter++;
    flipMatchCardsContainer.style.gridTemplateColumns = `repeat(${flipMatchCardsContainerGrid[levelCounter]}, 1fr)`;
    flipMatchCardsContainer.style.gridTemplateRows = `repeat(${flipMatchCardsContainerGrid[levelCounter]}, 1fr)`;
    flipMatchCardsContainer.innerHTML = null;
    startTheGame();

    // DISABLING THE NEXT BUTTON WHEN LEVEL IS EQUAL TO THE LAST LEVEL OF THE GAME
    if (levelCounter === cardsCountArray.length - 1) {
        nextLevelButton.disabled = true;
        for (const flipMatchItself of flipMatchCardsContainer.children) {
            flipMatchItself.style.padding = '2px 3px';
        };
    };
    
    // RESULT MENU
    prevLevelButton.disabled = false;
    flipMatchResultScreenContainer.classList.remove('flip-match-result-screen-active');
    flipMatchResultHeader.textContent = flipMatchResultHeaderArray[levelCounter];
};

function previousLevelFunction() {
    levelCounter--;
    flipMatchCardsContainer.style.gridTemplateColumns = `repeat(${flipMatchCardsContainerGrid[levelCounter]}, 1fr)`;
    flipMatchCardsContainer.style.gridTemplateRows = `repeat(${flipMatchCardsContainerGrid[levelCounter]}, 1fr)`;
    flipMatchCardsContainer.innerHTML = null;
    startTheGame();
    
    // DISABLING THE NEXT BUTTON WHEN LEVEL IS EQUAL TO THE LAST LEVEL OF THE GAME
    if (levelCounter === 0) {
        prevLevelButton.disabled = true;
    };
    
    // RESULT MENU
    nextLevelButton.disabled = false;
    flipMatchResultScreenContainer.classList.remove('flip-match-result-screen-active');
    flipMatchResultHeader.textContent = flipMatchResultHeaderArray[levelCounter];      
};

// CONTROLS FUNCTIONS

function gameModesFunction() {
    flipMatchModeButtonContainer.classList.toggle('flip-match-control-mode-button-container-active');
};

// INITIALIZING BUTTONS
startGameButton.addEventListener('click', startTheGame);
nextLevelButton.addEventListener('click', nextLevelFunction);
prevLevelButton.addEventListener('click', previousLevelFunction);
replayLevelButton.addEventListener('click', replayLevelFunction);
modesButton.addEventListener('click', gameModesFunction);
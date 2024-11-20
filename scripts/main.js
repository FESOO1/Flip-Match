const flipMatchCardsContainer = document.querySelector('.flip-match-cards-themselves');
const startGameButton = document.getElementById('startGameButton');
const cardsCountArray = ['4','8','16','24'];
const flipMatchCardsContainerGrid = ['2','3','4','5'];
const foundMatches = ['2','4','8','12'];
let foundMatchesCounter = 0;
const natureCardValues = ['nature-one','nature-one','nature-two','nature-two','nature-three','nature-three','nature-four','nature-four','nature-five','nature-five','nature-six','nature-six','nature-seven','nature-seven','nature-eight','nature-eight','nature-nine','nature-nine','nature-ten','nature-ten','nature-eleven','nature-eleven','nature-twelve','nature-twelve']
const natureCardImages = ['../assets/pictures/nature/nature-one.jpg','../assets/pictures/nature/nature-one.jpg','../assets/pictures/nature/nature-two.jpg','../assets/pictures/nature/nature-two.jpg', '../assets/pictures/nature/nature-three.jpg','../assets/pictures/nature/nature-three.jpg','../assets/pictures/nature/nature-four.jpg','../assets/pictures/nature/nature-four.jpg','../assets/pictures/nature/nature-five.jpg','../assets/pictures/nature/nature-five.jpg','../assets/pictures/nature/nature-six.jpg','../assets/pictures/nature/nature-six.jpg','../assets/pictures/nature/nature-seven.jpg','../assets/pictures/nature/nature-seven.jpg','../assets/pictures/nature/nature-eight.jpg','../assets/pictures/nature/nature-eight.jpg','../assets/pictures/nature/nature-nine.jpg','../assets/pictures/nature/nature-nine.jpg','../assets/pictures/nature/nature-ten.jpg','../assets/pictures/nature/nature-ten.jpg','../assets/pictures/nature/nature-eleven.jpg','../assets/pictures/nature/nature-eleven.jpg','../assets/pictures/nature/nature-twelve.jpg','../assets/pictures/nature/nature-twelve.jpg'];
let levelCounter = 0;
let cardClicked = 0;
let savedValues = [];
let isPlaying = false;

// RESULT MENU VARIABLES
const prevLevelButton = document.getElementById('prevLevelButton');
const nextLevelButton = document.getElementById('nextLevelButton');
const replayLevelButton = document.getElementById('replayLevelButton');
const backToMenuButton = document.getElementById('backToMenuButton');
const flipMatchResultHeader = document.querySelector('.flip-match-result-screen-header');
const flipMatchResultScreenContainer = document.querySelector('.flip-match-result-screen');
const flipMatchResultHeaderArray = ['Congratulations! You Won!','Victory Achieved! Get Ready for the Next Level.','Level Up! On to the Next Challenge.','Final Stage Conquered!'];

// CONTROLS VARIABLES

const flipMatchControlsContainer = document.querySelector('.flip-match-controls');
const flipMatchModeButtonContainer = document.querySelector('.flip-match-control-mode-button-container');
const flipMatchModeButtonItself = document.querySelectorAll('.flip-match-control-mode-itself');
const modesButton = document.getElementById('modesButton');
const cardImages = ['natureCardImages', 'cartoonCardImages', 'animalsCardImages'];
let cardImagesCounter = 0;
const playMusicButton = document.getElementById('playMusicButton');
const flipMatchMusic = document.querySelector('.flip-match-music');
let isOn = false;
let savedMode = 'nature-mode';

// FLIP MATCH VARIABLES

const flipMatchContainer = document.querySelector('.flip-match');

// START THE GAME

async function startTheGame() {
    isPlaying = true;

    // FEATCHING DATA FROM JSON
    const response = await fetch('../data/data.json');
    const imageData = await response.json();

    // MAKING THE CONTROLS DISAPPEAR
    flipMatchControlsContainer.classList.remove('flip-match-controls-active');

    // CREATING AS MANY ELEMENTS AS WE NEED

    for (let i = 0; i < cardsCountArray[levelCounter]; i++) {
        flipMatchCardsContainer.innerHTML += `
            <button type="button" value="${natureCardValues[i]}" class="flip-match-card-itself">
                <div class="flip-match-card-itself-image">
                    <img class="flip-match-card-itself-image-itself">
                </div>
            </button>
        `;

        // CHANGING THE PICTURES BASED ON THE MODE
        const flipMatchCardItselfImagesItself = document.querySelectorAll('.flip-match-card-itself-image-itself');

        // CHECKING IF THE SAVEDMODE'S VALUE CHANGED TO ANY OF THE FLIP MATCH BUTTONS' VALU, IF SO THE PICTURES WILL BE CHANGES BASED ON THE VALUE
        if (savedMode === flipMatchModeButtonItself[0].value) {
            flipMatchCardItselfImagesItself[i].src = imageData.natureCardImages[i];
        } else if (savedMode === flipMatchModeButtonItself[1].value) {
            flipMatchCardItselfImagesItself[i].src = imageData.cartoonCardImages[i];
        } else {
            flipMatchCardItselfImagesItself[i].src = imageData.animalsCardImages[i];
        };

        // HANDLING THE CARDS
        const flipMatchCardItself = document.querySelectorAll('.flip-match-card-itself');
        
        for (let i = 0; i < flipMatchCardItself.length; i++) {
            flipMatchCardItself[i].addEventListener('click', () => {
                // INCREMENTING THE CARDCLIKED VARIABLE BY ONE SO THAT I CAN KEEP TRACK OF HOW MANY I HAVE CLICKED. CLASSLIST IS ALSO BEING ADDED TO FLIP THE CARD AS WELL AS PUSHING THAT CARD'S VALUE INTO AN ARRAY SO THAT I CAN COMPARE THEM WHEN I CLICK ON THE SECOND CARD.
                cardClicked++;
                flipMatchCardItself[i].classList.add('flip-match-card-itself-flipped');
                savedValues.push(flipMatchCardItself[i].value);

                // WHEN TWO CARDS ARE CLICKED:
                if (cardClicked === 2) {
                    
                    // COMPARING THE SAVED VALUE OF THE PREVIOUS CARD TO THE SECOND CLICKED CARD:
                    if (savedValues[0] === flipMatchCardItself[i].value) {

                        // IF IT IS A MATCH, WE WILL EMPTY THE ARRAY AND CHANGE VALUE OF CARDCLICKED VARIABLE SO THAT I CAN KEEP USING IT.
                        cardClicked = 0;
                        savedValues = [];

                        // REMOVING ALL THE CLASSES FROM THE CARD AND ADDING ANOTHER CLASS SO THAT THE CARDS THAT ARE MATCH STAY FLIPPED.
                        for (const flipMatchCardItselfs of flipMatchCardsContainer.children) {
                            if (flipMatchCardItselfs.classList.contains('flip-match-card-itself-flipped')) {
                                flipMatchCardItselfs.classList.remove('flip-match-card-itself');
                                flipMatchCardItselfs.classList.remove('flip-match-card-itself-flipped');
                                flipMatchCardItselfs.classList.add('flip-match-card-itself-found');
                            };
                        };

                        // COUNTING HOM MANY MATCHES ARE FOUND
                        foundMatchesCounter++;

                        // IF FOUND MATCHES ARE EQUAL TO HOW MANY MATCHES ARE THERE
                        if (foundMatchesCounter === Number.parseInt(foundMatches[levelCounter], 10)) {
                            // STOPPING THE GAME
                            isPlaying = false;

                            setTimeout(() => {
                                // MAKING A MENU POP SO THAT A USER CAN GO TO THE NEXT LEVEL OR REPLAY THE SAME ONE OR GO BACK TO THE PREVIOUS LEVEL AND SO ON.
                                flipMatchResultScreenContainer.classList.add('flip-match-result-screen-active');

                                // RESETTING THE VARIABLE
                                foundMatchesCounter = 0;
                            }, 300);
                        };
                    } else {
                        // IF IT IS NOT A MATCH, WE WILL EMPTY THE ARRAY AND UNFLIPP ALL THE CARDS.

                        cardClicked = 0;
                        savedValues = [];
                        setTimeout(() => {
                            for (const flipMatchCardItselfs of flipMatchCardItself) {
                                flipMatchCardItselfs.classList.remove('flip-match-card-itself-flipped');  
                            };   
                        }, 300);                
                    };
                };
            });
        };

        // RANDOMNESS - MAKING SURE ALL THE CARDS ARE IN A RANDOM ORDER.
        for (const flipMatchCardItselfs of flipMatchCardItself) {
            flipMatchCardItselfs.style.order = Math.floor(Math.random() * cardsCountArray[levelCounter]);
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

function goBackToMenuFunction() {
    isPlaying = false;
    flipMatchCardsContainer.innerHTML = null;
    flipMatchResultScreenContainer.classList.remove('flip-match-result-screen-active');
    flipMatchControlsContainer.classList.add('flip-match-controls-active');
    levelCounter = 0;
    flipMatchCardsContainer.style.gridTemplateColumns = `repeat(${flipMatchCardsContainerGrid[levelCounter]}, 1fr)`;
    flipMatchCardsContainer.style.gridTemplateRows = `repeat(${flipMatchCardsContainerGrid[levelCounter]}, 1fr)`;
};

// CONTROLS FUNCTIONS

function gameModesFunction() {
    flipMatchModeButtonContainer.classList.toggle('flip-match-control-mode-button-container-active');
    modesButton.classList.toggle('flip-match-control-mode-button-itself-open');
};

function playMusicFunction() {
    if (isOn === false) {
        flipMatchMusic.play();
        flipMatchMusic.volume = 0.1;
        playMusicButton.textContent = 'MUSIC : ON';

        isOn = true;
    } else {
        flipMatchMusic.pause();
        playMusicButton.textContent = 'MUSIC : OFF';

        isOn = false;
    };
};

// FLIP MATCH MODE BUTTON ITSELF

for (let i = 0; i < flipMatchModeButtonItself.length; i++) {
    flipMatchModeButtonItself[i].addEventListener('click', () => {
        for (const flipMatchModeButtonItselfs of flipMatchModeButtonItself) {
            flipMatchModeButtonItselfs.classList.remove('flip-match-control-mode-itself-active');
        };
        flipMatchModeButtonItself[i].classList.add('flip-match-control-mode-itself-active');

        savedMode = flipMatchModeButtonItself[i].value;
    });
};

// INITIALIZING BUTTONS
startGameButton.addEventListener('click', startTheGame);
nextLevelButton.addEventListener('click', nextLevelFunction);
prevLevelButton.addEventListener('click', previousLevelFunction);
replayLevelButton.addEventListener('click', replayLevelFunction);
modesButton.addEventListener('click', gameModesFunction);
playMusicButton.addEventListener('click', playMusicFunction);
backToMenuButton.addEventListener('click', goBackToMenuFunction);
const flipMatchCardsContainer = document.querySelector('.flip-match-cards-themselves');
const cardsCountArray = ['4','8','16','24','36'];
const flipMatchCardsContainerGrid = ['2','3','4','5','6'];
const foundMatches = ['2','4','8','12', '18'];
let foundMatchesCounter = 0;
const cardValues = ['card-value-one','card-value-one','card-value-two','card-value-two','card-value-three','card-value-three','card-value-four','card-value-four','card-value-five','card-value-five','card-value-six','card-value-six','card-value-seven','card-value-seven','card-value-eight','card-value-eight','card-value-nine','card-value-nine','card-value-ten','card-value-ten','card-value-eleven','card-value-eleven','card-value-twelve','card-value-twelve','card-value-thirteen','card-value-thirteen','card-value-fourteen','card-value-fourteen','card-value-fifteen','card-value-fifteen','card-value-sixteen','card-value-sixteen','card-value-seventeen','card-value-seventeen','card-value-eighteen','card-value-eighteen'];
let levelCounter = 0;
let cardClicked = 0;
let savedValues = [];
let isPlaying = false;

// RESULT MENU VARIABLES
const flipMatchResultScreenMainContainer = document.querySelector('.flip-match-result-screen-main');
const prevLevelButton = document.getElementById('prevLevelButton');
const nextLevelButton = document.getElementById('nextLevelButton');
const replayLevelButton = document.getElementById('replayLevelButton');
const backToMenuButton = document.getElementById('backToMenuButton');
const flipMatchResultHeader = document.querySelector('.flip-match-result-screen-header');
const flipMatchResultScreenContainer = document.querySelector('.flip-match-result-screen');
const flipMatchResultHeaderArray = ['Amazing! You are Moving to Level 2!','Great Work! Level 3 Awaits!','Fantastic! Level 4 is Ready for You.','Unstoppable! Welcome to the Final Level!', 'Champion! You have Won the Game!'];

// CONTROLS VARIABLES

const flipMatchControlsContainer = document.querySelector('.flip-match-controls');
const flipMatchModeButtonContainer = document.querySelector('.flip-match-control-mode-button-container');
const flipMatchModeButtonItself = document.querySelectorAll('.flip-match-control-mode-itself');
const modesButton = document.getElementById('modesButton');
const continueGameButton = document.getElementById('continueGameButton');
const startGameButton = document.getElementById('startGameButton');
const cardImages = ['natureCardImages', 'cartoonCardImages', 'animalsCardImages', 'fruitsCardImages'];
let cardImagesCounter = 0;
const playMusicButton = document.getElementById('playMusicButton');
const flipMatchMusic = document.querySelector('.flip-match-music');
let isOn = false;
let savedMode = 'nature-mode';

// FLIP MATCH VARIABLES
const flipMatchContainer = document.querySelector('.flip-match');

// FLIP MATCH GAME BUTTONS
const flipMatchGameMenuButton = document.getElementById('flipMatchGameMenuButton');
const flipMatchGameSoundButton = document.getElementById('flipMatchGameSoundButton');

// SOUNDS

const wrongSounds = ['../assets/music/wrong/wrong-sound-one.mp3','../assets/music/wrong/wrong-sound-two.mp3','../assets/music/wrong/wrong-sound-three.mp3','../assets/music/wrong/wrong-sound-four.mp3','../assets/music/wrong/wrong-sound-five.mp3'];
const correctSounds = ['../assets/music/correct/correct-sound-one.mp3','../assets/music/correct/correct-sound-two.mp3','../assets/music/correct/correct-sound-three.mp3','../assets/music/correct/correct-sound-four.mp3'];
const levelUpSounds = ['../assets/music/level-up/level-up-sound-one.mp3','../assets/music/level-up/level-up-sound-two.mp3','../assets/music/level-up/level-up-sound-three.mp3','../assets/music/level-up/level-up-sound-four.mp3','../assets/music/level-up/level-up-sound-five.mp3'];
const winningSounds = ['../assets/music/winner/winner-sound-one.mp3','../assets/music/winner/winner-sound-two.mp3','../assets/music/winner/winner-sound-three.mp3','../assets/music/winner/winner-sound-four.mp3','../assets/music/winner/winner-sound-five.mp3'];

// FLIP MATCH TIMER
const flipMatchTimerButton = document.querySelector('.flip-match-timer-itself-button');
const flipMatchTimerInfo = document.querySelector('.flip-match-timer-info');
const flipMatchTimerLevelText = document.querySelector('.flip-match-timer-info-level-text');
const flipMatchTimerItself = document.querySelector('.flip-match-timer-itself-text');
const flipMatchTimerLeftText = document.getElementById('flipMatchTimerLeftText');
const flipMatchTimerRightText = document.getElementById('flipMatchTimerRightText');
let scoreCounter = 0;
let flipMatchTimerLeft = 0;
let flipMatchTimerRight = 0;
let flipMatchInterval;
let flipMatchTimerLevelTextCounter = 1;

const threeStarsPerformanceText = document.getElementById('threeStarsPerformanceText');
const twoStarsPerformanceText = document.getElementById('twoStarsPerformanceText');
const levelTimerPerformanceThree = ['10','15','30','90','120'];
const levelTimerPerformanceTwo = ['15','20','45','120','200'];
let levelTimerPerformanceCounter = 0;

// FLIP MATCH TIMER STARS

const flipMatchResultScreenScoreboard = document.querySelector('.flip-match-result-screen-scoreboard');

// START THE GAME

async function startTheGame() {
    isPlaying = true;

    // ENABLING THE NEXT BUTTON
    if (levelCounter === 0) {
        nextLevelButton.disabled = false;
    };
    // AS SOON AS A USER CLICKS ON ONE OF THE CARDS TIMER WILL START
    flipMatchTimerLeftText.textContent = '00';
    flipMatchTimerRightText.textContent = '00';
    flipMatchTimerFunction();

    // FEATCHING DATA FROM JSON
    const response = await fetch('../data/data.json');
    const imageData = await response.json();

    // MAKING THE CONTROLS DISAPPEAR
    flipMatchControlsContainer.classList.remove('flip-match-controls-active');
    flipMatchContainer.classList.add('flip-match-active');

    // CREATING AS MANY ELEMENTS AS WE NEED

    for (let i = 0; i < cardsCountArray[levelCounter]; i++) {
        flipMatchCardsContainer.innerHTML += `
            <button type="button" value="${cardValues[i]}" class="flip-match-card-itself">
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
        } else if (savedMode === flipMatchModeButtonItself[2].value) {
            flipMatchCardItselfImagesItself[i].src = imageData.fruitsCardImages[i];
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
                flipMatchCardItself[i].disabled = true;
                savedValues.push(flipMatchCardItself[i].value);

                // WHEN TWO CARDS ARE CLICKED:
                if (cardClicked === 2) {
                    
                    // COMPARING THE SAVED VALUE OF THE PREVIOUS CARD TO THE SECOND CLICKED CARD:
                    if (savedValues[0] === flipMatchCardItself[i].value) {

                        // MAKING A SOUND TO LET A USER KNOW THAT IT IS A MATCH
                        /* flipMatchMusic.src = correctSounds[Math.floor(Math.random() * 4)]; */
                        flipMatchMusic.src = '../assets/music/correct.mp3';
                        flipMatchMusic.play();

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

                            // SHOWING STARTS BASED ON HOW FAST THE USER COMPLETED THE LEVEL
                            if (scoreCounter < levelTimerPerformanceThree[levelTimerPerformanceCounter]) {
                                flipMatchResultScreenScoreboard.classList.add('flip-match-result-screen-scoreboard-three-star-performance');
                            } else if (scoreCounter < levelTimerPerformanceTwo[levelTimerPerformanceCounter]) {
                                flipMatchResultScreenScoreboard.classList.remove('flip-match-result-screen-scoreboard-three-star-performance');
                                flipMatchResultScreenScoreboard.classList.add('flip-match-result-screen-scoreboard-two-star-performance');
                            } else {
                                flipMatchResultScreenScoreboard.classList.remove('flip-match-result-screen-scoreboard-three-star-performance');
                                flipMatchResultScreenScoreboard.classList.remove('flip-match-result-screen-scoreboard-two-star-performance');
                                flipMatchResultScreenScoreboard.classList.add('flip-match-result-screen-scoreboard-one-star-performance');
                            };

                            // STOPING THE TIMER
                            clearInterval(flipMatchInterval);

                            setTimeout(() => {
                                // MAKING A SOUND TO LET A USER KNOW THAT IT IS NOT A MATCH
                                flipMatchMusic.src = '../assets/music/level-up.mp3';
                                flipMatchMusic.play();

                                // MAKING A MENU POP SO THAT A USER CAN GO TO THE NEXT LEVEL OR REPLAY THE SAME ONE OR GO BACK TO THE PREVIOUS LEVEL AND SO ON.
                                flipMatchResultScreenMainContainer.classList.add('flip-match-result-screen-main-active');
                                flipMatchResultScreenContainer.classList.add('flip-match-result-screen-active');

                                // RESETTING THE VARIABLE
                                foundMatchesCounter = 0;
                            }, 300);
                        };
                    } else {

                        // MAKING A SOUND TO LET A USER KNOW THAT IT IS NOT A MATCH
                        /* flipMatchMusic.src = wrongSounds[Math.floor(Math.random() * 5)]; */
                        flipMatchMusic.src = './assets/music/wrong.mp3';
                        flipMatchMusic.play();

                        // IF IT IS NOT A MATCH, WE WILL EMPTY THE ARRAY AND UNFLIPP ALL THE CARDS.

                        cardClicked = 0;
                        savedValues = [];
                        setTimeout(() => {
                            for (const flipMatchCardItselfs of flipMatchCardItself) {
                                flipMatchCardItselfs.disabled = false;
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
    flipMatchResultScreenMainContainer.classList.remove('flip-match-result-screen-main-active');
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

        // MAKING A SOUND TO LET A USER KNOW THAT IT IS A MATCH
        flipMatchMusic.src = '../assets/music/winner.mp3';
        flipMatchMusic.play();
    };
    
    // RESULT MENU
    prevLevelButton.disabled = false;
    flipMatchResultScreenContainer.classList.remove('flip-match-result-screen-active');
    flipMatchResultScreenMainContainer.classList.remove('flip-match-result-screen-main-active');
    flipMatchResultHeader.textContent = flipMatchResultHeaderArray[levelCounter];

    // TIMER RESETTING
    flipMatchTimerLeftText.textContent = '00';
    flipMatchTimerRightText.textContent = '00';
    flipMatchTimerLeft = 0, flipMatchTimerRight = 0;
    scoreCounter = 0;

    // PERFORMANCE COUNTER
    levelTimerPerformanceCounter++;
    flipMatchTimerLevelTextCounter++;
    threeStarsPerformanceText.textContent = levelTimerPerformanceThree[levelTimerPerformanceCounter];
    twoStarsPerformanceText.textContent = levelTimerPerformanceTwo[levelTimerPerformanceCounter];
    flipMatchTimerLevelText.textContent = `Level ${flipMatchTimerLevelTextCounter}:`;
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
    flipMatchResultScreenMainContainer.classList.remove('flip-match-result-screen-main-active');
    flipMatchResultHeader.textContent = flipMatchResultHeaderArray[levelCounter];      

    // TIMER RESETTING
    flipMatchTimerLeftText.textContent = '00';
    flipMatchTimerRightText.textContent = '00';
    flipMatchTimerLeft = 0, flipMatchTimerRight = 0;
    scoreCounter = 0;

    // PERFORMANCE COUNTER
    levelTimerPerformanceCounter--;
    flipMatchTimerLevelTextCounter--;
    threeStarsPerformanceText.textContent = levelTimerPerformanceThree[levelTimerPerformanceCounter];
    twoStarsPerformanceText.textContent = levelTimerPerformanceTwo[levelTimerPerformanceCounter];
    flipMatchTimerLevelText.textContent = `Level ${flipMatchTimerLevelTextCounter}:`;
};

function goBackToMenuFunction() {
    continueGameButton.disabled = false;
    isPlaying = false;
    flipMatchCardsContainer.innerHTML = null;
    flipMatchResultScreenContainer.classList.remove('flip-match-result-screen-active');
    flipMatchResultScreenMainContainer.classList.remove('flip-match-result-screen-main-active');
    flipMatchControlsContainer.classList.add('flip-match-controls-active');
    flipMatchContainer.classList.remove('flip-match-active');

    // RESETTING THE VARIABLE
    foundMatchesCounter = 0;
    cardClicked = 0;
    savedValues = [];

    // TIMER RESETTING
    clearInterval(flipMatchInterval);
    flipMatchTimerLeft = 0, flipMatchTimerRight = 0;
    scoreCounter = 0;
};

// CONTROLS FUNCTIONS

function gameModesFunction() {
    flipMatchModeButtonContainer.classList.toggle('flip-match-control-mode-button-container-active');
    modesButton.classList.toggle('flip-match-control-mode-button-itself-open');
};

function playMusicFunction() {
    if (isOn === false) {
        flipMatchMusic.volume = 0;
        playMusicButton.textContent = 'SOUND : OFF';
        playMusicButton.classList.add('flip-match-control-button-itself-music-active');
        flipMatchGameSoundButton.classList.add('flip-match-game-sound-button-on');

        isOn = true;
    } else {
        flipMatchMusic.volume = 0.5;
        playMusicButton.textContent = 'SOUND : ON';
        playMusicButton.classList.remove('flip-match-control-button-itself-music-active');
        flipMatchGameSoundButton.classList.remove('flip-match-game-sound-button-on');

        isOn = false;
    };
};

function continueGameFunction() {
    startTheGame();
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

// FLIP MATCH TIMER

function flipMatchTimerFunction() {
    flipMatchInterval = setInterval(() => {
        scoreCounter++;
        if (flipMatchTimerRight < 59) {
            flipMatchTimerRight++;
            flipMatchTimerRightText.textContent = `${flipMatchTimerRight}`.padStart(2, '0');
        } else {
            flipMatchTimerRight = 0;
            flipMatchTimerRightText.textContent = `${flipMatchTimerRight}`.padStart(2, '0');
            
            if (flipMatchTimerLeft < 15) {
                flipMatchTimerLeft++;
                flipMatchTimerLeftText.textContent = `${flipMatchTimerLeft}`.padStart(2, '0');
            } else {
                clearInterval(flipMatchInterval);
            };
        };
    }, 1000);
};

// FLIP MATCH TIMER BUTTON FUNCTION

function flipMatchTimerInfoFunction(e) {
    e.stopImmediatePropagation();

    flipMatchTimerInfo.classList.add('flip-match-timer-info-active');
};

window.addEventListener('click', () => {
    flipMatchTimerInfo.classList.remove('flip-match-timer-info-active');
});

// INITIALIZING BUTTONS
continueGameButton.addEventListener('click', continueGameFunction);
startGameButton.addEventListener('click', () => {
    levelCounter = 0;
    prevLevelButton.disabled = true;
    flipMatchCardsContainer.style.gridTemplateColumns = `repeat(${flipMatchCardsContainerGrid[levelCounter]}, 1fr)`;
    flipMatchCardsContainer.style.gridTemplateRows = `repeat(${flipMatchCardsContainerGrid[levelCounter]}, 1fr)`;

    startTheGame();
});
nextLevelButton.addEventListener('click', nextLevelFunction);
prevLevelButton.addEventListener('click', previousLevelFunction);
replayLevelButton.addEventListener('click', replayLevelFunction);
modesButton.addEventListener('click', gameModesFunction);
playMusicButton.addEventListener('click', playMusicFunction);
flipMatchGameSoundButton.addEventListener('click', playMusicFunction);
backToMenuButton.addEventListener('click', goBackToMenuFunction);
flipMatchGameMenuButton.addEventListener('click', goBackToMenuFunction);
flipMatchTimerButton.addEventListener('click', flipMatchTimerInfoFunction);
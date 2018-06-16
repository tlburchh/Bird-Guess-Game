

var birdType = ["hawk","heron","bluejay","cardinal"];
var wins = 0;
var guesses = 12;
var remainingGuesses = 0;
var lettersGuessed = [];  
var guessingWord = [];
var currentBird
var hasFinished = false;

 

function resetGame(){
    remainingGuesses === guesses;

    currentBird = birdType[Math.floor(Math.random() * birdType.length)];

    lettersGuessed = [];
    guessingWord = [];

    for (var i = 0; i < birdType[currentBird].length; i++) {
    guessingWord.push("_");
    }

    updateDisplay();
};

function updateDisplay() {

    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }
};

function evaluateGuess(letter) {
    var positions = [];
    for (var i = 0; i < selectableWords[currentBird].length; i++) {
        if(selectableWords[currentBird][i] === letter) {
            positions.push(i);
        }
    }
    if (positions.length <= 0) {
        remainingGuesses--;
    }else {
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
function checkWin(){
    if(guessingWord.indexOf("_") === -1) {
        wins++;
        hasFinished = true;
    }
};
function checkLoss(){
    if(remainingGuesses <= 0) {
        hasFinished = true;
    }
};
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
};

document.onkeydown = function(event) {
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};






     // player selects a letter



// letter is right or wrong

// if right, letter replaces _ on screen

// Else remaining guesses decrease by 1
    // incorrect letter shows in letters guessed

// if all correct letters guessed image changes and sound plays and win increases by 1

// else if all guesses reaches 0 reset game


    var updateDisplay =
    "<p> Press any key to play!" + "</p>"+
    "<p> Wins: " + wins + "</p>" +
    "<p>" + guessingWord + "</p>" +
    "<p> Guesses Remaining: " + guesses + "</p>" +
    "<p> Letters Guessed: " + lettersGuessed + "</p>";

    document.querySelector("#game").innerHTML = updateDisplay;

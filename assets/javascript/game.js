
// create word list
var birdType = ["hawk","heron","bluejay","cardinal"];

//    wins = 0
var wins = 0;
//    remaining guesses = 12
var guesses = 12;
//    letters guessed
var lettersGuessed = 0;

// randomly select word from list
var computerGuess = birdType[Math.floor(Math.random() * birdType.length)];

// represent word with _ _ _ 


document.onkeyup = function(event) {

    var userGuess = event.key;
}
     // game documentation

// player selects a letter

// letter is right or wrong

// if right, letter replaces _ on screen

// Else remaining guesses decrease by 1
    // incorrect letter shows in letters guessed

// if all correct letters guessed image changes and sound plays and win increases by 1

// else if all guesses reaches 0 reset game

 console.log(gameHTML);
    // on screen
    var gameHTML =
    "<p> Press any key to play!" + "</p>"+
    "<p> Wins: " + wins + "</p>" +
    "<p> bird blank spaces" + "</p>" +
    "<p> Guesses Remaining: " + guesses + "</p>" +
    "<p> Letters Guessed: " + lettersGuessed + "</p>";

    document.querySelector("#game").innerHTML = gameHTML;

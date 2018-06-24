var birdType = ["robin", "heron", "hummingbird", "hawk"];
var guessLetter = [];
var blankGuess =[];
var selectedWord = birdType[random];

function wordSelect() {
    var random = Math.floor(Math.random() * birdType.length);
    
    console.log(selectedWord);
}
wordSelect();

function wordDash() {
    for(var i=0; i < selectedWord.length; i++) {
        blankGuess[i] = "_ ";
        document.getElementById("#game").innerHTML=blankGuess.join('');
    }
}
wordDash();

var updateDisplay =
"<p> Press any key to play!" + "</p>"+
"<p> Wins: " + wins + "</p>" +
"<p>" + guessingWord + "</p>" +
"<p> Guesses Remaining: " + guesses + "</p>" +
"<p> Letters Guessed: " + lettersGuessed + "</p>";

document.querySelector("#game").innerHTML = updateDisplay;
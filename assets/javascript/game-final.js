var wordsList = ["heron", "cardinal", "hawk", "owl"];
var chosenWord = "";
var lettersInChosenWord = [];
var numBlanks = 0;
var blanksAndSuccess = [];
var wrongGuess = [];

var winCounter = 0;
var lossCounter = 0;
var numGuesses = lettersInChosenWord.length + 5;
function startGame() {
    numGuesses = lettersInChosenWord.length +5;
    chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    lettersInChosenWord = chosenWord.split("");
    numBlanks = lettersInChosenWord.length;

    console.log(chosenWord);

    blanksAndSuccess = [];
    wrongGuess = [];

    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccess.push("_");
    }

    console.log(blanksAndSuccess);

      // Reprints the guessesLeft to 9
  document.getElementById("guesses-left").text = ("Guesses left: " + numGuesses);

  // Prints the blanks at the beginning of each round in the HTML
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

  // Clears the wrong guesses from the previous round
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}   

function checkLetters(letter) {
    var letterInWord = false;

    for(var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === letter) {
            letterInWord = true;
        }
    }

    if (letterInWord) {
        for (var j = 0; j < numBlanks; j++) {
            if (chosenWord[j] === letter) {
                blanksAndSuccesses[j] = letter;
            }
        }
        console.log(blanksAndSuccesses);
    }
    else {
        wrongGuess.push(letter);
        numGuesses--;
    }
    
}
 function roundComplete() {
     console.log("WinCount: " + winCounter +" | LossCount: " + lossCounter + " | NumGuesses: " +numGuesses);

     document.getElementById("guesses-left").innerHTML = numGuesses;
     // This will print the array of guesses and blanks onto the page.
     document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
     // This will print the wrong guesses onto the page.
     document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
    if (lettersInChosenWord.toString() === blanksAndSuccess.toString()) {
        winCounter++;
        alert("You win!");
        document.getElementById("win-counter").innerHTML = winCounter;
        startGame()
    }

    else if (numGuesses === 0) {
        lossCounter++;
        alert("Try again!");
        document.getElementById("loss-counter").innerHTML = lossCounter;
        startGame();
    }

    startGame();

    document.onkeyup = function(event) {
        var letterGuessed = String.fromCharCode(event.which).toLowerCase();
        checkLetters(letterGuessed);
        roundComplete()
    }
 }

/*******************************
 * Display for UI
 */
//     var updateDisplay =
//         "<p> Press any key to play!" + "</p>"+
//         "<p> Wins: " + winCounter + "</p>" +
//         "<p> Losses: " + lossCounter + "</p>" +
//         "<p>" + blanksAndSuccess + "</p>" +
//         "<p> Guesses Remaining: " + numGuesses + "</p>" +
//         "<p> Letters Guessed: " + wrongGuess + "</p>";

// document.querySelector("#game").innerHTML = updateDisplay;

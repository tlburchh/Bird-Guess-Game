var wordGuessGame = {

    wordsToPick: {
    heron:{
        name: "Great Blue Heron",
        picture: "https://cdn.audubon.org/cdn/farfuture/Y00P6_P9GsQXzLOY0EL_iWR9iJwRG4q7rH53SiRJTwE/mtime:1422550159/sites/default/files/Great_Blue_Heron_m17-70-188_l_0.jpg",
        birdCall: "https://cdn.audubon.org/cdn/farfuture/QEJKK1jbht_L7qWuBr-TK0evjtPTE9vLQiXCMWYY9T0/mtime:1416244727/sites/default/files/GRBLHE_2.alarmcroaksgivenwhentakingflight_MDle_0.mp3?uuid=5bd98d949f386",
        address:  "https://www.audubon.org/field-guide/bird/great-blue-heron"
    }, 
    bluebird:{
        name: "Eastern Bluebird",
        picture: "https://cdn.audubon.org/cdn/farfuture/H5ZRI1pq5URejvfUGIL5PNyJfjsPStw0tCakr0QHGz8/mtime:1422549537/sites/default/files/Eastern_Bluebird_s52-12-082_l.jpg",
        birdCall: "https://cdn.audubon.org/cdn/farfuture/ILbWpQ1mMk_D62_REayWVjxATLAMBSXS6PRTWJ5q7sM/mtime:1416244636/sites/default/files/EASBLU_1.song_KYle.mp3?uuid=5bd989ad6c6ed",
    }, 
    hawk:{
        name: "Red-tailed Hawk",
        picture: "https://cdn.audubon.org/cdn/farfuture/rL7yerlRWJDUHiE0e7JL-IhE2k5GLoOk5Xv5MxWW72w/mtime:1422549281/sites/default/files/Red-tailed_Hawk_r25-8-001_l.jpg",
        birdCall: "https://cdn.audubon.org/cdn/farfuture/Rt7y6oXFnC7FLdAJqUo6IMWuCE4hIdbyCUBh9ViNmMM/mtime:1416244607/sites/default/files/RETAHA_1.typicalcallsnum1_NYle.mp3?uuid=5bd983074352c"

    }, 
    eagle:{
        name: "Bald Eagle",
        picture: "https://cdn.audubon.org/cdn/farfuture/bnpM0vx5X9GiYByt-OuJY2J0Wy-ehHezzpXm6p4fIaU/mtime:1422549334/sites/default/files/Bald_Eagle_v11-15-014_l_0.jpg",
        birdCall: "https://cdn.audubon.org/cdn/farfuture/6WNV30LcTG9kAXm-TRpNZgzGNhXoKKtprW3IDaR2mGQ/mtime:1416244610/sites/default/files/BALEAG_1.alarmcallsofperchedadult_KYle.mp3?uuid=5bd9733eb2d50"
    }
},


 // Variables that set the initial state of our wordGuess game.
 wordInPlay: null,
 lettersOfTheWord: [],
 matchedLetters: [],
 guessedLetters: [],
 guessesLeft: 0,
 totalGuesses: 0,
 letterGuessed: null,
 wins: 0,

 // The setupGame method is called when the page first loads.
 setupGame: function() {
   // Here we pick a random word.
   var objKeys = Object.keys(this.wordsToPick);
   this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

   // Split the chosen word up into its individual letters.
   this.lettersOfTheWord = this.wordInPlay.split("");
   // Builds the representation of the word we are trying to guess and displays it on the page.
   // At the start it will be all underscores since we haven't guessed any letters ("_ _ _ _").
   this.rebuildWordView();
   // This function sets the number of guesses the user gets, and renders it to the HTML.
   this.processUpdateTotalGuesses();
 },

 // This function is run whenever the user guesses a letter..
 updatePage: function(letter) {
   // If the user has no guesses left, restart the game.
   if (this.guessesLeft === 0) {
     this.restartGame();
   }
   // Otherwise...
   else {
     // Check for and handle incorrect guesses.
     this.updateGuesses(letter);

     // Check for and handle correct guesses.
     this.updateMatchedLetters(letter);

     // Rebuild the view of the word. Guessed letters are revealed, non-guessed letters have a "_".
     this.rebuildWordView();

     // If the user wins, restart the game.
     if (this.updateWins() === true) {
       this.restartGame();
     }
   }

 },

 // This function governs what happens when the user makes an incorrect guess (that they haven't guessed before).
 updateGuesses: function(letter) {
   // If the letter is not in the guessedLetters array, and the letter is not in the lettersOfTheWord array..
   if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {

     // Add the letter to the guessedLetters array.
     this.guessedLetters.push(letter);

     // Decrease guesses by one.
     this.guessesLeft--;

     // Update guesses remaining and guesses letters on the page.
     document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
     document.querySelector("#guessed-letters").innerHTML =
     this.guessedLetters.join(", ");
   }
 },

 // This function sets the initial guesses the user gets.
 processUpdateTotalGuesses: function() {
   // The user will get more guesses the longer the word is.
   this.totalGuesses = this.lettersOfTheWord.length + 5;
   this.guessesLeft = this.totalGuesses;

   // Render the guesses left to the page.
   document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
 },

 // This function governs what happens if the user makes a successful guess.
 updateMatchedLetters: function(letter) {
   // Loop through the letters of the "solution".
   for (var i = 0; i < this.lettersOfTheWord.length; i++) {
     // If the guessed letter is in the solution, and we haven't guessed it already..
     if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
       // Push the newly guessed letter into the matchedLetters array.
       this.matchedLetters.push(letter);
     }
   }
 },

 // This function builds the display of the word that is currently being guessed.
 // For example, if we are trying to guess "blondie", it might display "bl_ndi_".
 rebuildWordView: function() {
   // We start with an empty string.
   var wordView = "";

   // Loop through the letters of the word we are trying to guess..
   for (var i = 0; i < this.lettersOfTheWord.length; i++) {
     // If the current letter has been guessed, display that letter.
     if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
       wordView += this.lettersOfTheWord[i];
     }
     // If it hasn't been guessed, display a "_" instead.
     else {
       wordView += "&nbsp;_&nbsp;";
     }
   }

   // Update the page with the new string we built.
   document.querySelector("#current-word").innerHTML = wordView;
 },

 // Function that "restarts" the game by resetting all of the variables.
 wordInPlay: null,
  lettersOfTheWord: [],
  matchedLetters: [],
  guessedLetters: [],
  guessesLeft: 0,
  totalGuesses: 0,
  letterGuessed: null,
  wins: 0,

  // The setupGame method is called when the page first loads.
  setupGame: function() {
    // Here we pick a random word.
    var objKeys = Object.keys(this.wordsToPick);
    this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

    // Split the chosen word up into its individual letters.
    this.lettersOfTheWord = this.wordInPlay.split("");
    // Builds the representation of the word we are trying to guess and displays it on the page.
    // At the start it will be all underscores since we haven't guessed any letters ("_ _ _ _").
    this.rebuildWordView();
    // This function sets the number of guesses the user gets, and renders it to the HTML.
    this.processUpdateTotalGuesses();
  },

  // This function is run whenever the user guesses a letter..
  updatePage: function(letter) {
    // If the user has no guesses left, restart the game.
    if (this.guessesLeft === 0) {
      this.restartGame();
    }
    // Otherwise...
    else {
      // Check for and handle incorrect guesses.
      this.updateGuesses(letter);

      // Check for and handle correct guesses.
      this.updateMatchedLetters(letter);

      // Rebuild the view of the word. Guessed letters are revealed, non-guessed letters have a "_".
      this.rebuildWordView();

      // If the user wins, restart the game.
      if (this.updateWins() === true) {
        this.restartGame();
      }
    }

  },

  // This function governs what happens when the user makes an incorrect guess (that they haven't guessed before).
  updateGuesses: function(letter) {
    // If the letter is not in the guessedLetters array, and the letter is not in the lettersOfTheWord array..
    if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {

      // Add the letter to the guessedLetters array.
      this.guessedLetters.push(letter);

      // Decrease guesses by one.
      this.guessesLeft--;

      // Update guesses remaining and guesses letters on the page.
      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector("#guessed-letters").innerHTML =
      this.guessedLetters.join(", ");
    }
  },

  // This function sets the initial guesses the user gets.
  processUpdateTotalGuesses: function() {
    // The user will get more guesses the longer the word is.
    this.totalGuesses = this.lettersOfTheWord.length + 5;
    this.guessesLeft = this.totalGuesses;

    // Render the guesses left to the page.
    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  },

  // This function governs what happens if the user makes a successful guess.
  updateMatchedLetters: function(letter) {
    // Loop through the letters of the "solution".
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      // If the guessed letter is in the solution, and we haven't guessed it already..
      if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
        // Push the newly guessed letter into the matchedLetters array.
        this.matchedLetters.push(letter);
      }
    }
  },

  // This function builds the display of the word that is currently being guessed.
  // For example, if we are trying to guess "blondie", it might display "bl_ndi_".
  rebuildWordView: function() {
    // We start with an empty string.
    var wordView = "";

    // Loop through the letters of the word we are trying to guess..
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      // If the current letter has been guessed, display that letter.
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
        wordView += this.lettersOfTheWord[i];
      }
      // If it hasn't been guessed, display a "_" instead.
      else {
        wordView += "&nbsp;_&nbsp;";
      }
    }

    // Update the page with the new string we built.
    document.querySelector("#current-word").innerHTML = wordView;
  },

  // Function that "restarts" the game by resetting all of the variables.
  restartGame: function() {
    document.querySelector("#guessed-letters").innerHTML = "";
    this.wordInPlay = null;
    this.lettersOfTheWord = [];
    this.matchedLetters = [];
    this.guessedLetters = [];
    this.guessesLeft = 0;
    this.totalGuesses = 0;
    this.letterGuessed = null;
    this.setupGame();
    this.rebuildWordView();
  },

  // Function that checks to see if the user has won.
  updateWins: function() {
    var win;

    // this won't work for words with double or triple letters
    // var lettersOfTheWordClone = this.lettersOfTheWord.slice(); //clones the array
    // this.matchedLetters.sort().join('') == lettersOfTheWordClone.sort().join('')

    // If you haven't correctly guessed a letter in the word yet, we set win to false.
    if (this.matchedLetters.length === 0) {
      win = false;
    }
    // Otherwise, we set win to true.
    else {
      win = true;
    }

    // If a letter appears in the lettersOfTheWord array, but not in the matchedLetters array, set win to false.
    // In English, if you haven't yet guessed all the letters in the word, you don't win yet.
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
        win = false;
      }
    }

    // If win is true...
    if (win) {

      // Increment wins.
      this.wins = this.wins + 1;

      // Update wins on the page.
      document.querySelector("#wins").innerHTML = this.wins;

      
    //   document.querySelector("#birdDiv").innerHTML = this.wordsToPick[this.wordInPlay].song +
    //   " By " + this.wordInPlay;

      // Update the image of the band on the page.
    document.querySelector("#birdDiv").innerHTML =
        "<img class='card-img-top' src='" +
        this.wordsToPick[this.wordInPlay].picture + "' alt='" +
        this.wordsToPick[this.wordInPlay].name + "'>"+"<br><br>"+"<h5>Congratulations!</h5>"+"<br><br>"+
        "<h6>Learn More:</h6> "+"<br><br>"+
        "<a class='btn btn-primary' href='" + 
        this.wordsToPick[this.wordInPlay].address + "'>" +
        this.wordsToPick[this.wordInPlay].name + "</a>";

    // document.querySelector("#website").innerHTML =
    //     "<a class='btn btn-primary' href='" +
    //     this.wordsToPick[this.wordInPlay].address + "'>" +
    //     this.wordsToPick[this.wordInPlay].name + "'</a>";


      // Play an audio track of the bird.
      var audio = new Audio(this.wordsToPick[this.wordInPlay].birdCall);
      audio.play();

      // return true, which will trigger the restart of our game in the updatePage function.
      return true;
    }
    // If win is false, return false to the updatePage function. The game goes on!
    return false;
  }
};

// Initialize the game when the page loads.
wordGuessGame.setupGame();

// When a key is pressed..
document.onkeyup = function(event) {
  // Capture pressed key and make it lowercase.
  wordGuessGame.letterGuessed = String.fromCharCode(event.which).toLowerCase();
  // Pass the guessed letter into our updatePage function to run the game logic.
  wordGuessGame.updatePage(wordGuessGame.letterGuessed);
};



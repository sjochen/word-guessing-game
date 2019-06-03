var words = [
    "gretzky",
    "icing",
    "shutout",
    "goalie",
    "skates",
    "crossbar",
    "center",
    "bench",
    "assist",
    "apples",
    "genos",
    "flyers",
    "brodeur"

]

var guessedLetters = [];        
var currentWordIndex;           
var guessingWord = [];          
var remainingGuesses = 0;       
var gameStarted = false;        
var hasFinished = false;           
var wins = 0;
var winSound = sound("../assets/images/gh.mp3");
var loseSound;                   




const maxTries = 13;




function resetGame () {
    remainingGuesses = maxTries;
    gameStarted = false;
    currentWordIndex = Math.floor(Math.random() * words.length);
    guessedLetters = [];
    guessingWord = [];
    console.log(remainingGuesses);
    console.log(currentWordIndex);
    for (var i = 0; i < words[currentWordIndex].length; i++) {
        guessingWord.push(" _ ");
    }
    document.getElementById("tryAgain").style.cssText = "display: none";
    document.getElementById("you-lose").style.cssText = "display: none";
    document.getElementById("you-win").style.cssText = "display: none";
    updateDisplay();
}



resetGame();



document.onkeydown = function (event) {
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    updateDisplay();
    checkWin();
};




function checkWin() {
    if(guessingWord.indexOf(" _ ") === -1) {
        document.getElementById("you-win").style.cssText = "display: Block";
        winSound.play();
        document.getElementById("tryAgain").style.cssText = "display: Block";
        wins++;
        hasFinished = true;
    }
};

function evaluateGuess(letter) {
    
    var positions = [];

    for (var i = 0; i < words[currentWordIndex].length; i++) {
        if(words[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    
    if (positions.length <= 0) {
        remainingGuesses--;
        
    } else {
        
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        document.getElementById("you-lose").style.cssText = "display: Block";
        document.getElementById("tryAgain").style.cssText = "display: Block";
        hasFinished = true;
    }
};
/* **********************************************************************************
 * Class: WordGuessGame
 * Contains all the functionality to do a hangman-type game
 * Note the use of Capitalizing first letter of each word in a class name
 * in a standard practice in most OO languages like C#, C++, Swift,
 * Java, objective-C etc.
 ********************************************************************************** */
/*
 * The arrays below are "static" members of this class, but there is no built-in way
 * to define static properties in Javascript.  The way to get the desired behavior - i.e.
 * these arrays are the same for all instances the objects -- aka class level -- is to 
 * deifine them outside the class and refer to tem with static methods in the class
 */
let _wordArray = [];
let _imageArray = [];

class WordGuessGame {
    // Give default number of missed guesses to 5
    constructor(guesses = 5) {
        //These are for the overall game no matter how many times you play
        this.nbrWins = 0;
        this.nextWordIndex = 0;
        this.createWordArray();
        this.createImageArray();

        // Audio for game
        this.audioStart = new Audio("./assets/sounds/Pacman_Introduction_Music-KP.mp3"); // Audio to start the game
        this.audioWinner = new Audio("./assets/sounds/Strong_Punch-Mike_Koenig.mp3"); // Audio if you got it correct
        this.audioLoser = new Audio("./assets/sounds/Buzzer-SoundBible.com.mp3"); // Audio if you got it wrong

        this.gameInProgress = false; // true if playing game, false if ended
    }

    // *static* properties
    // This allows access to the *static* property arrays so one for ALL instances
    static get wordArray() {
        return _wordArray;
    }
    static get imageArray() {
        return _imageArray;
    }

    // Creates an array of word choices
    // To Do: For words with spaces or special characters, fill in those parts of the word
    // when you start the guessing game so the only pick letters but get hints
    // e.g. "The B-52's" wiuld show "_ _ _ _ - 5 2 ' _"
    createWordArray() {
        this.wordArray = ["DuranDuran", "TheCure", "INXS", "Queen", "Devo", "Yaz", "TheSmiths",
            "NewOrder", "REM", "TheHumanLeague", "DepecheMode", "TearsForFears",
            "TheCure", "TheCars", "TalkingHeads", "TheClash", "PeterGabriel",
            "TheB52s"
        ];
    }

    createImageArray() {
        this.imageArray = [
            "./assets/images/new-wave-bands-duran-duran.jpg",
            "./assets/images/new-wave-bands-the-cure.jpg",
            "./assets/images/new-wave-bands-inxs.jpg",
            "./assets/images/275x200Queen.png",
            "./assets/images/new-wave-bands-devo.jpg",
            "./assets/images/new-wave-bands-yaz.jpg",
            "./assets/images/new-wave-bands-the-smiths.jpg",
            "./assets/images/new-wave-bands-new-order.jpg",
            "./assets/images/new-wave-bands-rem.jpg",
            "./assets/images/new-wave-bands-human-league.jpg",
            "./assets/images/new-wave-bands-depeche-mode.jpg",
            "./assets/images/new-wave-bands-tears-for-fears.jpg",
            "./assets/images/new-wave-bands-the-cure.jpg",
            "./assets/images/275x200TheCars.png",
            "./assets/images/275x200TheTalkingHeads.png",
            "./assets/images/275x200TheClash.png",
            "./assets/images/275x200PeterGabriel.png",
            "./assets/images/275x200B52s.png"
        ];
    }

    // These change every time the game restarts - the is really a word object
    // during rafctoring, I will use this method to create a new instance of word
    // which will be the actaul guess for just one word
    reset(guesses) {
        this.gameInProgress = true; // true if playing game, false if ended

        // get a random word from the database/array of words
        this.nextWordIndex = Math.floor(Math.random() * this.wordArray.length);

        this.word = new Word(this.wordArray[this.nextWordIndex], this.imageArray[this.nextWordIndex], guesses);

        this.displayGameStatus();
        this.audioStart.play();
    }

    makeAGuess(letter) {
        this.word.makeAGuess(letter);
        this.displayGameStatus();

        // if you are done and got it right, end the game successfully
        // if you dont have it right and have no more guesses, end game unsuccessfully
        // Otherwise just give them another guess
        if (this.word.guessedCorrectly) {
            this.nbrWins += 1; // Add one to number of games won
            this.endGame(true);
        } else if (this.word.incorrectGuessesLeft < 1) {
            this.endGame(false);
        }
    }

    // format html to display game
    displayGameStatus() {
        document.getElementById("currentGuess").innerHTML = this.word.currentGuess;
        document.getElementById("incorrectGuessesLeft").innerHTML = this.word.incorrectGuessesLeft;
        document.getElementById("lettersGuessed").innerHTML = this.word.lettersGuessed;
        document.getElementById("lettersCorrectlyGuessed").innerHTML = this.word.lettersCorrectlyGuessed;
        document.getElementById("lettersIncorrectlyGuessed").innerHTML = this.word.lettersIncorrectlyGuessed;
        if (wordGuessGame.gameInProgress) {
            document.getElementById("gameMessage").innerHTML = "playing ...";
            document.getElementById("mainTitle").innerHTML = "Press letter or number key to guess band name";
        } else {
            document.getElementById("mainTitle").innerHTML = "Press spacebar to start";
        }
        document.getElementById("nbrWins").innerHTML = wordGuessGame.nbrWins;
    }

    // End the current game
    endGame(winner) {
        var str;

        this.gameInProgress = false;
        this.displayGameStatus();

        // Winner or loser messages and audio
        if (winner) {
            str = "You WON! Word is: " + this.word.wordToGuess;
            this.audioWinner.play();
        } else {
            str = "You Lost, word is: " + this.word.wordToGuess;
            this.audioLoser.play();
        }
        // Display Message - always show correct answer so they know
        document.getElementById("correctAnswer").innerHTML = this.word.wordToGuess;
        document.getElementById("albumCover").src = this.word.wordImage;
        document.getElementById("gameMessage").innerHTML = str;
    }

    // Print self/this
    print() {
        // WordGuessGame properties
        document.write("wins:" + this.nbrWins + "<br>");
        document.write("nextWordIndex" + this.nextWordIndex + "<br>");
        // wordArray();
        // imageArray();

        // "word" properties - i.e. properties for one word guess - refactor to object
        document.write("gameInProgress:'" + this.gameInProgress + "'" + "<br>");
        document.write("wordToGuess:'" + this.word.wordToGuess + "'" + "<br>");
        document.write("wordImage:'" + this.word.wordImage + "'" + "<br>");
        document.write("currentGuess:'" + this.word.currentGuess + "'" + "<br>");
        document.write("lettersGuessed:'" + this.word.lettersGuessed + "'" + "<br>");
        document.write("incorrectGuessesLeft:" + this.word.ncorrectGuessesLeft + "<br>");
        document.write("lettersCorrectlyGuessed:'" + this.word.lettersCorrectlyGuessed + "'" + "<br>");
        document.write("nbrLettersGuessedCorrect:" + this.word.nbrLettersGuessedCorrect + "<br>");
        document.write("lettersIncorrectlyGuessed:'" + this.word.lettersIncorrectlyGuessed + "'" + "<br>");
        document.write("nbrLettersGuessedIncorrect:" + this.word.nbrLettersGuessedIncorrect + "<br>");
        document.write("guessedCorrectly:" + this.word.guessedCorrectly + "<br>");
    }

    // Log self/this
    log() {
        // WordGuessGame properties
        console.log("wins:" + this.nbrWins);
        console.log("nextWordIndex: '" + this.nextWordIndex + "'");
        // wordArray();
        // imageArray();

        // "word" properties - i.e. properties for one word guess - refactor to object
        console.log("gameInProgress:'" + this.gameInProgress + "'");
        console.log("wordToGuess:'" + this.word.wordToGuess + "'");
        console.log("wordImage:'" + this.word.wordImage + "'");
        console.log("currentGuess:'" + this.word.currentGuess + "'");
        console.log("lettersGuessed:'" + this.word.lettersGuessed + "'");
        console.log("incorrectGuessesLeft:" + this.word.incorrectGuessesLeft);
        console.log("lettersCorrectlyGuessed:'" + this.word.lettersCorrectlyGuessed + "'");
        console.log("nbrLettersGuessedCorrect:" + this.word.nbrLettersGuessedCorrect);
        console.log("lettersIncorrectlyGuessed:'" + this.word.lettersIncorrectlyGuessed + "'");
        console.log("nbrLettersGuessedIncorrect:" + this.word.nbrLettersGuessedIncorrect);
        console.log("guessedCorrectly:'" + this.word.guessedCorrectly + "'");
    }
}
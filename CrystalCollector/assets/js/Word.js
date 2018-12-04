/*
 * Class: Word
 * This class has all logic for a single word guess.  The game uses
 * this to guess a single word.  It creates a new object of this class
 * for every word they wish to guess
 */
class Word {
    constructor(word, image, guesses = 5) {
        this.wordToGuess = word;
        this.wordImage = image;
        this.currentGuess = "";
        this.lettersGuessed = "";
        this.incorrectGuessesLeft = guesses;
        this.lettersCorrectlyGuessed = "";
        this.nbrLettersGuessedCorrect = 0;
        this.lettersIncorrectlyGuessed = "";
        this.nbrLettersGuessedIncorrect = 0;
        this.guessedCorrectly = false;

        this.makeBlankGuess(this.wordToGuess);
    }

    // Make the blank layout of the word
    makeBlankGuess(word) {
        var text = "";
        for (var member in word) {
            // text += "list[member]";
            text += "_";
        }
        this.currentGuess = text;
    }

    // put the letter in the correct spot
    updateCurrentGuess(indicesFound, replacement) {
        var newGuess = this.currentGuess;
        var currGuess = this.currentGuess;

        // Get all the matches in case same letter multiple times
        for (var i = 0; i < indicesFound.length; i++) {
            newGuess =
                currGuess.substr(0, indicesFound[i]) +
                replacement +
                currGuess.substr(indicesFound[i] + replacement.length);
            currGuess = newGuess;
        }

        this.currentGuess = newGuess;

        if (this.currentGuess == this.wordToGuess.toLowerCase()) {
            this.guessedCorrectly = true;
        }
    }

    // Guess one letter and find all the places it appears in the word
    makeAGuess(letter) {
        var lowerLetter = letter.toLowerCase();
        var lowerWord = this.wordToGuess.toLowerCase();

        // If they already guessed this letter, give them a pass and another try
        // If they guess correctly, do NOT count that against them
        if (this.lettersGuessed.search(lowerLetter) < 0) {
            this.lettersGuessed += lowerLetter;

            // Find all occurrences of letter in word to guess
            var indicesFound = []; // index of where the letter is found
            var nbrFound = 0;
            for (var i = 0; i < lowerWord.length; i++) {
                if (lowerWord[i] == lowerLetter) {
                    nbrFound += 1;
                    indicesFound.push(i);
                }
            }

            // Add to the letters guessed string if they didnt aleady guess it
            if (nbrFound > 0) {
                // add to letters correctly guessed
                this.lettersCorrectlyGuessed += lowerLetter;
                this.nbrLettersGuessedCorrect += 1;

                this.updateCurrentGuess(indicesFound, lowerLetter);
            } else {
                // Take away one of the guesses and add to letters Incorrectly guessed 
                this.incorrectGuessesLeft -= 1;
                this.lettersIncorrectlyGuessed += lowerLetter;
                this.nbrLettersGuessedIncorrect += 1;
            }

        } else {
            console.log("Already guessed the letter: " + lowerLetter);
        }
    }
}
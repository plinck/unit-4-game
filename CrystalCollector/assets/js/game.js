/* **********************************************************************************
 * Main Program - game
 * main is the "view controller" that interacts with web page which is the view
 * WordGuessGame stores the game info, words, and progress (the "model") and contains the logic
 * to run the game - like amn app controller.
 * NOTE:  I have this all done in one class per the instructions, but it really should
 * be divided into a few.  WordGuessGame would be the overall game running mutiple
 * times and storing the list of word choices.
 * Another class "word" we be the logic and data for a guess.  WordGuessGame
 * would create 1..n "word" objects for each time they tried.
 ********************************************************************************** */


// Create WordGuessGame game object to run the overall game
var wordGuessGame = new WordGuessGame(5);

// Get the keyboard input - whenever a key is press
// I use *spacebar* to strat the game so the user does not accidentally start it
document.addEventListener('keyup', function (event) {

    // Get user input guesses if the game is in progress, otherwise
    // wait for the spacebar key to start the game
    if (wordGuessGame.gameInProgress) {
        // Get the character pressed
        var charValue = String.fromCharCode(event.keyCode);

        // Make sure the character is a valid letter and if it is not, just igore it and move on
        // Only accept keycodes for 'a' (65) through 'z' (90) and '0' (48) through '9' (57)
        if (((event.keyCode >= 65) && (event.keyCode <= 90)) || ((event.keyCode >= 48) && (event.keyCode <= 57))) {
            wordGuessGame.makeAGuess(charValue);
        } // if keycodes 'a' - 'z'

    } // if game in progress
    else {
        // wait for spacebar
        if (event.keyCode == 32) {
            wordGuessGame.reset(5); // reset all word stuff and start the game
        }
    } // else 
});


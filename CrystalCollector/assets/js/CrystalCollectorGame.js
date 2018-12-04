/* **********************************************************************************
 * Class: CrystalCollectorGame
 * Contains all the functionality to do a game
 * Note the use of Capitalizing first letter of each word in a class name
 * in a standard practice in most OO languages like C#, C++, Swift,
 * Java, objective-C etc.
 ********************************************************************************** */

class CrystalCollectorGame {
    // Give default number of missed guesses to 5
    constructor() {
        // These are for the overall game no matter how many times you play
        this.totalGames = 0;
        this.nbrWins = 0;
        this.nbrLosses = 0;

        this.gameInProgress = false; // true if playing game, false if ended

        // One instance of a guess
        this.currentNbrToGuess = 0;
        this.crystalValues = [0, 0, 0, 0];
        this.currentGuess = 0;
        this.totalGuessedSoFar = 0;
    }

    // These change every time the game restarts - 
    reset() {
        this.gameInProgress = true; // true if playing game, false if ended

        // 1.) pick a random number to guess
        this.currentNbrToGuess = Math.floor(Math.random() * 120 + 19);

        // 2.) pick a random number for each of the crystals
        for (var i in this.crystalValues) {
            this.crystalValues[i] = Math.floor(Math.random() * 12 + 1);
        }
        this.currentGuess = 0;
        this.totalGuessedSoFar = 0;

        // Interact with the DOM
        this.displayCrystals(this.crystalValues);
        this.displayGameStatus();
    }

    makeAGuess(number) {
        // Add the number guessed to the totalGuessed so far
        // Compare to currentNbrToGuess
        // Asses
    }

    // create all the img crystals and display them
    displayCrystals(crystalValues) {
        for (var i in this.crystalValues) {
            // For each iteration, we will create an imageCrystal
            var imageCrystal = $("<img>");

            // First each crystal will be given the class ".crystal-image".
            imageCrystal.addClass("crystal-image");

            // Each imageCrystal will be given a src link to the crystal image
            imageCrystal.attr("src", "http://cdn.playbuzz.com/cdn/35910209-2844-45c0-b099-f4d82878d54f/00261fda-4062-4096-81fd-8cf96b9034e8.jpg");

            // This data attribute will be set equal to the array value.
            imageCrystal.attr("data-crystalvalue", crystalValues[i]);

            // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
            $("#crystals").append(imageCrystal);
        }
    }

    // format html to display game
    displayGameStatus() {

        $("#totalGames").innerHTML = this.totalGames;
        $("#nbrWins").innerHTML = this.nbrWins;
        $("#nbrLosses").innerHTML = this.nbrLosses;
        if (this.gameInProgress) {
            $("#gameMessage").innerHTML = "playing ...";
        }

        // One Game
        $("#currentNbrToGuess").innerHTML = this.currentGuess;
        $("#currentGuess").innerHTML = this.currentGuess;
        $("#totalGuessedSoFar").innerHTML = this.currentGuess;

    }

    // End the current game
    endGame(winner) {
        var str;

        // add to total games played
        // if won add to wins
        // if lost add to losses
        // display
        this.gameInProgress = false;
        this.displayGameStatus();

        // Winner or loser messages and audio
        if (winner) {
            str = "You WON! Good Job ";
        } else {
            str = "You Lost";
        }
    }

    // Print self/this
    print() {
        // CrystalCollectorGame properties

    }

    // Log self/this
    log() {
        // CrystalCollectorGame properties
        console.log("totalGames:" + this.totalGames);
        console.log("nbrWins:" + this.nbrWins);
        console.log("nbrLosses:" + this.nbrLosses);

        // single instance of game
        console.log("gameInProgress:" + this.gameInProgress);
        console.log("currentNbrToGuess:" + this.currentNbrToGuess);
        console.log("currentGuess:" + this.currentGuess);
        console.log("totalGuessedSoFar:" + this.totalGuessedSoFar);
        console.log("currentGuess:" + this.currentGuess);
    }
}
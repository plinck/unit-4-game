/* **********************************************************************************
 * Class: StarWarsGame
 * Contains all the functionality to do a game.
 * The games methods() and properties are contained within this 
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


class StarWarsGame {
    // Give default number of missed guesses to 5
    constructor() {
        // These are for the overall game no matter how many times you play
        this.totalGames = 0;
        this.nbrWins = 0;
        this.nbrLosses = 0;

        this.gameInProgress = false; // true if playing game, false if ended

        this.characters = [];

        // Create the characters
        this.createCharacters();

        // this.availablePlayers = this.characters;         // tracks characters available players
        // this.availableEnemies = this.characters;         // tracks characters available enemies
    }

    createCharacters() {
        // create player objects
        // need to randomize them
        for (var i = 0; i < 4; i++) {
            var characterTemp = new Character("character " + i, "./assets/images/character" + (i + 1) + ".png");

            this.characters.push(characterTemp); // put object in array
        }
    }

    // pick who is the player
    pickAPlayer(playerIdx) {
        // pick player
        if (this.characters[playerIdx].characterIsAlive) {
            this.characters[playerIdx].characterType = PLAYERTYPE;
            return this.characters[playerIdx];
        } else {
            console.log("cant pick " + this.characters[playerIdx].characterName + " they are dead");
            return null;
        }

    }

    // pick who is the enemy
    pickAnEnemy(enemyIdx) {
        // pick enemy
        if (this.characters[enemyIdx].characterIsAlive) {
            this.characters[enemyIdx].characterType = ENEMYTYPE;
            return this.characters[enemyIdx];
        } else {
            console.log("cant pick " + this.characters[enemyIdx].characterName + " they are dead");
            return null;
        }
    }

    // Attack 
    attack(attacker, enemy) {
        attacker.attack();
        if (attacker.beenAttacked()) {
            console.log("Attacker still alive");
        }

        enemy.attack();
        if (enemy.beenAttacked()) {
            console.log("Enemy still alive");
        } else {
            // add to list of dead enemies
        }

        // If attacket is not alive, end game
        if (!attacker.characterIsAlive) {
            this.endGame(false); // winner
        }

        if (!enemy.characterIsAlive) {
            // Killed an enemy, must pick another
        }

        this.displayGameStatus();


        console.log("Attacker");
        console.log("--------");
        attacker.log();

        console.log("Enemy");
        console.log("--------");
        enemy.log();
    }

    // These change every time the game restarts - 
    reset() {
        this.gameInProgress = true; // true if playing game, false if ended

        // 1.) available players


        // Interact with the DOM
        this.displayCharacters(this.characters);
        this.displayGameStatus();
    }

    // create all the img crystals and display them in id
    displayCharacters(arr) {
        // clear the current batch of crystals
        $("#characters").empty();

        for (var i in arr) {
            // For each iteration, image
            var image = $("<img>");

            image.addClass("char-image");

            // Each imageCrystal will be given a src link to the crystal image
            image.attr("src", arr[i].characterImage);

            // This data attribute will be set equal to the iterator which is index to char o.
            image.attr("data-value", i);
            image.css("width", "100px");
            image.css("height", "100px");

            // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
            $("#characters").append(image);
        }
    }


    // format html to display game
    displayGameStatus() {

        $("#totalGames").text(this.totalGames);
        $("#nbrWins").text(this.nbrWins);
        $("#nbrLosses").text(this.nbrLosses);
        if (this.gameInProgress) {
            $("#gameMessage").text("playing ...");
        }
    }

    // End the current game
    endGame(winner) {
        var str;
        this.gameInProgress = false;

        // add to total games played
        this.totalGames += 1;

        // Winner or loser messages and audio
        if (winner) {
            str = "You WON! Good Job ";
            this.nbrWins += 1;
        } else {
            str = "You Lost";
            this.nbrLosses += 1;
        }

        // display
        this.displayGameStatus();

        alert(str);
        this.reset();
    }

    // Print self/this
    print() {
        // StarWarsGame properties

    }

    // Log self/this
    log() {
        // StarWarsGame properties
        console.log("totalGames:" + this.totalGames);
        console.log("nbrWins:" + this.nbrWins);
        console.log("nbrLosses:" + this.nbrLosses);

    }
}
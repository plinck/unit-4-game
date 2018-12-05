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
        this.enemiesDefeated = 0;

        this.currentPlayer = undefined;
        this.currentEnemy = undefined;

        this.gameInProgress = false; // true if playing game, false if ended

        this.characters = [];

        // Create the characters
        this.createCharacters();

        // this.availablePlayers = this.characters;         // tracks characters available players
        // this.availableEnemies = this.characters;         // tracks characters available enemies
    }

    createCharacters() {
        // Initialize to empty array first
        this.characters = 0;
        this.characters = [];

        // create player objects
        // need to randomize them
        for (var i = 0; i < 4; i++) {
            var characterTemp = new Character("character " + i, "./assets/images/character" + (i + 1) + ".png");

            this.characters.push(characterTemp); // put object in array
        }
    }

    // pick who is the player
    pickAPlayer(playerIdx) {
        // if already picked cant pick again
        if (this.currentPlayer != undefined) {
            return false;
        }

        // pick player
        if (this.characters[playerIdx].characterIsAlive) {
            this.characters[playerIdx].characterType = PLAYERTYPE;
            this.currentPlayer = this.characters[playerIdx];
        } else {
            console.log("cant pick " + this.characters[playerIdx].characterName + " they are dead");
            return false;
        }

        $("#selectionTitle").text("Now, select enemy");

        // Display
        this.displayCharacter(this.currentPlayer, "#playerCard");

        return true;
    }

    // pick who is the enemy
    pickAnEnemy(enemyIdx) {
        // if already picked cant pick again
        if (this.currentEnemy != undefined) {
            return false;
        }


        // pick enemy
        if (this.characters[enemyIdx].characterIsAlive) {
            this.characters[enemyIdx].characterType = ENEMYTYPE;
            this.currentEnemy = this.characters[enemyIdx];
        } else {
            console.log("cant pick " + this.characters[enemyIdx].characterName + " they are dead");
            return false;
        }

        // Display
        this.displayCharacter(this.currentEnemy, "#enemyCard");
        return true;
    }

    // Attack 
    attack() {
        var attacker = this.currentPlayer;
        var enemy = this.currentEnemy;

        if (attacker == undefined || enemy == undefined) {
            // Cant attack - no match
            console.log("Cant fight, need player and enemy");
            return;
        }

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
        if (enemy.beenAttacked()) {
            console.log("Enemy still alive");
        } else {
            // add to list of dead enemies
        }


        // If attacker is not alive, end game
        if (!attacker.characterIsAlive) {
            this.endGame(false); // lost
        }

        if (!enemy.characterIsAlive) {
            // Killed an enemy, must pick another
            this.endMatch(true); // winner
        }

        this.displayGameStatus();

    }

    // These change every time the game restarts - 
    reset() {
        this.gameInProgress = true; // true if playing game, false if ended

        // Go back to choosing player
        $("#selectionTitle").text("Select Player");

        // 1.) available players
        this.createCharacters();
        this.displayAvailableCharacter(this.characters);

        // Number enemies defeated
        this.enemiesDefeated = 0;

        // get rid of player and enemy
        this.currentPlayer = undefined;
        this.currentEnemy = undefined;

        // Interact with the DOM
        this.displayGameStatus();
    }

    // create all the img crystals and display them in id
    displayAvailableCharacter(arr) {
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

    // format html to display info for a character using card
    displayCharacter(characterObj, characterTagID = "#playerCard") {

        if (characterObj == undefined) {
            $(characterTagID + " .characterImage").attr("src", "./assets/images/blankCharacter.png");
            $(characterTagID + " .characterName").text("Name");
            $(characterTagID + " .totalAttackPower").text("Power");
            $(characterTagID + " .healthPoints").text("Health");
        } else {
            $(characterTagID + " .characterImage").attr("src", characterObj.characterImage);
            $(characterTagID + " .characterName").text(characterObj.characterName);
            $(characterTagID + " .totalAttackPower").text(characterObj.totalAttackPower);
            $(characterTagID + " .healthPoints").text(characterObj.healthPoints);
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

        this.displayCharacter(this.currentPlayer, "#playerCard");
        this.displayCharacter(this.currentEnemy, "#enemyCard");
    }

    // End the current match
    endMatch(winner) {
        var str;

        // add to total games played
        this.totalGames += 1;

        // Winner or loser messages and audio
        if (winner) {
            str = "You WON! Good Job ";
            // kill the enemy
            this.currentEnemy = undefined;
            this.nbrWins += 1;
            this.enemiesDefeated += 1;
            if (this.enemiesDefeated >= 3) {
                this.endGame(true);
            }
        } else {
            str = "You Lost";
            this.nbrLosses += 1;
            this.endGame(false);
        }

        // display
        this.displayGameStatus();

        alert(str);
    }

    // end the whole game - you lost or defeated all enemies
    endGame(winner) {
        this.gameInProgress = false;

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
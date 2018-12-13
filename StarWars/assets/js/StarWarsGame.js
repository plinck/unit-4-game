/* **********************************************************************************
 * Class: StarWarsGame
 * Contains all the functionality to do a game.
 * The games' methods() and properties are contained within this class
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

// Use strict to keep things sane and not crapp code
"use strict";
/*global $:false, jQuery:false */
/*global document:false */
/*global console:false */
/*global alert:false */

class StarWarsGame {
    // Give default number of missed guesses to 5
    constructor() {
        // These are for the overall game no matter how many times you play
        this.totalGames = 0;
        this.nbrWins = 0;
        this.nbrLosses = 0;
        this.totalEnemiesDefeated = 0; // All GAmes
        this.defeatedCharacters = [];

        this.currentPlayer = undefined;
        this.currentEnemy = undefined;
        this.enemiesDefeated = 0;

        this.gameInProgress = false; // true if playing game, false if ended

        this.characters = [];

        // Create the characters
        this.createCharacters();

    }

    // Create each of the possible players and enemies
    createCharacters() {
        let imageArray = ["./assets/images/character1.png",
            "./assets/images/character2.png",
            "./assets/images/character3.png",
            "./assets/images/character4.png"
        ];
        let nameArray = ["Ben",
            "Darth Vador",
            "C3PO",
            "Leah"
        ];

        // Initialize to empty array first
        this.characters = 0;
        this.characters = [];

        // create player/character objects
        // need to randomize them
        for (let i = 0; i < 4; i++) {
            let characterTemp = new Character(nameArray[i], imageArray[i]);

            this.characters.push(characterTemp); // put object in array
        }
    }

    // These change every time the game restarts - 
    reset() {
        this.gameInProgress = true; // true if playing game, false if ended

        // 1.) available players
        this.createCharacters();
        this.displayAvailableCharacters(this.characters);

        // Number enemies defeated
        this.enemiesDefeated = 0;
        this.defeatedCharacters.length = 0;
        this.defeatedCharacters = [];
        this.displayDefeatedCharacters(this.defeatedCharacters);

        // get rid of player and enemy
        this.currentPlayer = undefined;
        this.currentEnemy = undefined;

        // Interact with the DOM
        this.displayGameStatus();
    }

    // pick who is the player  - return true if successful, false if not
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

        this.displayGameStatus();

        return true;
    }

    // pick who is the enemy - return true if successful, false if not
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

        this.displayGameStatus();

        return true;
    }

    // Attack 
    attack() {
        let attacker = this.currentPlayer;
        let enemy = this.currentEnemy;

        if (attacker == undefined || enemy == undefined) {
            // Cant attack - no match
            console.log("Cant fight, need player and enemy");
            return;
        }

        // Attack the enemy
        attacker.attack(enemy);
        // If enemy is dead, they can not attack back
        if (!enemy.characterIsAlive) {
            // Killed an enemy, must pick another
            this.endMatch(true); // winner     
            return;
        }

        // Each time a player attacks, the enemy counterAttacks
        enemy.counterAttack(attacker);

        // If both are dead, send a message
        if (!attacker.characterIsAlive && !enemy.characterIsAlive) {
            alert("You both died! Game over");
            this.endMatch(true); // I guess you won since you killed them, but you also died
            return;
        } else {
            // If attacker (you, the player) is not alive, end game, enemy wins the match
            if (!attacker.characterIsAlive) {
                this.endMatch(false); // lost
                return;
            }
            // if enemy is dead, you win match and must face another enemy
            if (!enemy.characterIsAlive) {
                // Killed an enemy, must pick another
                this.endMatch(true); // winner
                return;
            }
        }

        this.displayGameStatus();
    }

    // create all the cards for all the characters
    displayAvailableCharacters(arr) {
        // clear the current batch of crystals
        $("#characterCards").empty();

        for (let i in arr) {
            // Create a bootstrap card for each of the characters 
            this.createCharacterCard(i, arr[i], "#characterCards");
        }
    }

    // create all the cards for all the enemies defeated
    displayDefeatedCharacters(arr) {
        // clear the current batch of crystals
        $("#characterDefeatedCards").empty();

        for (let i in arr) {
            // Create a bootstrap card for each of the characters 
            this.createCharacterCard(i, arr[i], "#characterDefeatedCards");
        }
    }

    // Since this is very "involved" html, I generate it on the fly using strings vs element by element
    // It is easier to read and format that way.  I did it to create a card for each chartacter vs just an image
    createCharacterCard(idx, characterObj, tagID = "#characterCards") {

        let characterCard = `<div class="characterLink card" data-value="${idx}">`;

        characterCard += `<div class="cardHeader">${characterObj.characterName}</div>`;
        characterCard += `<div class="cardBody">`;
        characterCard += `<img class="characterImage" src="${characterObj.characterImage}" alt="${characterObj.characterName}">`;
        characterCard += `<div class="imageBanner">`;
        characterCard += `<h6 class="totalAttackPower imageBannerText">Power: ${characterObj.totalAttackPower}</h6>`;
        characterCard += `<h6 class="healthPoints imageBannerText">Health: ${characterObj.healthPoints}</h6>`;
        characterCard += `</div>`;
        characterCard += `</div>`;
        characterCard += `</div>`;

        $(tagID).append(characterCard);

    }

    // format html to display info for a single character - the player or the enemy
    displaySingleCharacter(characterObj, characterTagID = "#playerCard") {

        if (characterObj == undefined) {
            $(characterTagID + " .characterImage").attr("src", "./assets/images/blankCharacter.png");
            $(characterTagID + " .characterName").text("");
            $(characterTagID + " .totalAttackPower").text("");
            $(characterTagID + " .healthPoints").text("");
        } else {
            $(characterTagID + " .characterImage").attr("src", characterObj.characterImage);
            $(characterTagID + " .characterName").text(characterObj.characterName);
            $(characterTagID + " .totalAttackPower").text(characterObj.totalAttackPower);
            $(characterTagID + " .healthPoints").text(characterObj.healthPoints);
        }

    }

    // format html to display game
    displayGameStatus() {

        $("#enemiesDefeated").text(this.totalEnemiesDefeated);
        $("#totalGames").text(this.totalGames);
        $("#nbrWins").text(this.nbrWins);
        $("#nbrLosses").text(this.nbrLosses);
        if (this.gameInProgress) {
            $("#gameMessage").text("playing ...");
        }
        // Go back to choosing player
        if (this.currentPlayer == undefined) {
            $("#selectionTitle").text("Select Player");
        } else {
            $("#selectionTitle").text("Select Enemy");
        }

        // Only show attack button if both are picked 
        if ((this.currentPlayer != undefined) &&  (this.currentEnemy != undefined)) {
            $("#attack-btn").css("visibility", "visible");
            $("#selectionTitle").text("Attack!");
        } else {
            $("#attack-btn").css("visibility", "hidden");
        }

        this.displaySingleCharacter(this.currentPlayer, "#playerCard");
        this.displaySingleCharacter(this.currentEnemy, "#enemyCard");
        this.displayDefeatedCharacters(this.defeatedCharacters);
    }

    // End the current match
    endMatch(winner) {
        let str;

        // Winner or loser messages and audio
        if (winner) {
            str = "You WON the matchup!";
            // Add enemy to list of those killed
            this.defeatedCharacters.push(this.currentEnemy);
            // Now, kill the enemy by making them undefined
            this.currentEnemy = undefined;
            this.enemiesDefeated += 1;
            this.totalEnemiesDefeated += 1;
            if (this.enemiesDefeated >= 3) {
                str = "You WON the matchup AND the game!";
                this.endGame(true);
            } else if (!this.currentPlayer.characterIsAlive) { // You won, but you are also dead
                this.currentPlayer = undefined;
                str = "You killed the enemy, but you are dead so you lose the game!";
                this.endGame(false);
            }
        } else {
            str = "You Lost";
            this.endGame(false);
        }

        // display
        this.displayGameStatus();

        alert(str);
    }

    // end the whole game - you lost or defeated all enemies
    endGame(winner) {
        this.gameInProgress = false;

        // add to total GAMES played
        this.totalGames += 1;

        if (winner) {
            this.nbrWins += 1; // Represents GAMES won, not matches
        } else {
            this.nbrLosses += 1; // Represents GAMES lost, not matches
        }

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
/* **********************************************************************************
 * Class: Character
 * Contains methods and properties for a single character
 * Note this charcter can be the player or an enemy.  
 * When it is an enemny ot has slightly different behavior than if its a player
 * For example, it does not gain attack points when it attacks.
 ********************************************************************************** */
// Use strict to keep things sane and not crapp code
"use strict";
/*global $:false, jQuery:false */
/*global document:false */
/*global console:false */
/*global alert:false */

const PLAYERTYPE = 1;
const ENEMYTYPE = 2;

class Character {

    // Create a character
    constructor(name, imageRef) {
        // Local Vars
        let rnd;                                                    // generic random number

        // Class/Object Vars
        this.characterName = name;
        this.characterImage = imageRef;
        this.characterType = 0;                                     // 0=generic/unpicked, 1=player/attacker, 2=enemy
        this.characterIsAlive = true;                               // true = alive, false = dead

        rnd = Math.floor(Math.random() * 100 + 1);
        this.healthPoints = rnd;                                    // to health

        rnd = Math.floor(Math.random() * 15 + 1);
        this.baseAttackPower = rnd;                                 // how much power gined when attacking

        rnd = Math.floor(Math.random() * 20 + 10);
        this.totalAttackPower = rnd;                                // total attack power

        this.counterAttackPower =  this.totalAttackPower;           // total counter attack power

    }

    // attack an enemy - can only be done if you are the player
    attack(character) {

        // Players Attack - enemies do NOT
        if (this.characterType == PLAYERTYPE) {
            character.reduceHealth(this.totalAttackPower);      // Reduce opponents health points by attack power
            this.totalAttackPower += this.baseAttackPower;      // only add power if you are player - should it be before reducing their health?
        }
    }

    counterAttack(character) {
        // Enemies Counter Attack, players do not
        if (this.characterType == ENEMYTYPE) {
            character.reduceHealth(this.counterAttackPower);    // Reduce opponents health points by counter attack power
        }
    }


    // someone else attacks you
    reduceHealth(healthPointsToLose) {
        this.healthPoints -= healthPointsToLose;        
        if (this.healthPoints <= 0 ) {
            this.characterIsAlive = false;                               
        } else {
            this.characterIsAlive = true;                              
        }
    }

    // Log self/this
    log() {
        // single instance of game
        console.log("characterName:" + this.characterName);
        console.log("characterImage:" + this.characterImage);
        console.log("characterType:" + this.characterType);

        console.log("healthPoints:" + this.healthPoints);
        console.log("baseAttackPower:" + this.baseAttackPower);
        console.log("totalAttackPower:" + this.totalAttackPower);
        console.log("counterAttackPower:" + this.counterAttackPower);
    }
}
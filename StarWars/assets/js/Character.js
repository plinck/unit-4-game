/* **********************************************************************************
 * Class: Character
 * Contains methods and properties for a single character
 * Note this charcter can be the player or an enemy.  
 * When it is an enemny ot has slightly different behavior than if its a player
 * For example, it does not gain attack points when it attacks.
 ********************************************************************************** */
const PLAYERTYPE = 1;
const ENEMYTYPE = 2;

class Character {

    // Create a character
    constructor(name, imageRef, characterType = 0, healthPoints = 60, decrementHealthPoints = 1,
         baseAttackPower = 6, totalAttackPower = 60, counterAttackPower = 60) {

        this.characterName = name;
        this.characterImage = imageRef;
        this.characterType = characterType; // 0=generic, 1=player/attacker, 2=enemy

        this.healthPoints = healthPoints;                           // to health
        this.decrementHealthPoints = decrementHealthPoints;         // how much health lost when attacked

        this.baseAttackPower = baseAttackPower;                     // how much power gined when attacking
        this.totalAttackPower = totalAttackPower;                   // total attack power
        this.counterAttackPower = counterAttackPower;               // total counter attack power

        this.characterIsAlive = true;                               // true = alive, false = dead
    }

    // attack an enemy - can only be done if you are the player
    attack() {
        if (this.characterType == PLAYERTYPE) {
            this.totalAttackPower += this.baseAttackPower;      // only add power if you are player
        }
    }

    // someone else attacks you
    beenAttacked() {
        this.healthPoints -= this.decrementHealthPoints;
        if (this.healthPoints <= 0 ) {
            this.characterIsAlive = false;                               
            return false;                                   // You are now dead
        } else {
            this.characterIsAlive = true;                              
            return true;                                    // You are still alive
        }
    }

    // Log self/this
    log() {
        // single instance of game
        console.log("characterName:" + this.characterName);
        console.log("characterImage:" + this.characterImage);

        console.log("healthPoints:" + this.healthPoints);
        console.log("decrementHealthPoints:" + this.decrementHealthPoints);

        console.log("baseAttackPower:" + this.baseAttackPower);
        console.log("totalAttackPower:" + this.totalAttackPower);
        console.log("counterAttackPower:" + this.counterAttackPower);
        console.log("characterType:" + this.characterType);
    }
}
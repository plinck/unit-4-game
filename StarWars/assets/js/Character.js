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
    constructor(name, imageRef) {

        // Local Vars
        let rnd;                                                    // generic random number

        // Class/Object Vars
        this.characterName = name;
        this.characterImage = imageRef;
        this.characterType = 0;                                     // 0=generic/unpicked, 1=player/attacker, 2=enemy

        rnd = Math.floor(Math.random() * 10 + 1);
        this.healthPoints = rnd;                                    // to health
        this.decrementHealthPoints = 1;                             // how much health lost when attacked

        rnd = Math.floor(Math.random() * 5 + 1);
        this.baseAttackPower = rnd;                                 // how much power gined when attacking

        rnd = Math.floor(Math.random() * 20 + 10);
        this.totalAttackPower = rnd;                                // total attack power

        rnd = Math.floor(Math.random() * 15 + 5);
        this.counterAttackPower = rnd;                              // total counter attack power

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
        } else {
            this.characterIsAlive = true;                              
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
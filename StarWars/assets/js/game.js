/* **********************************************************************************
 * Main Program - game
 * main is the "view controller" that interacts with web page which is the view
 ********************************************************************************** */
// Use strict to keep things sane and not crapp code
"use strict";
/*global $:false, jQuery:false */
/*global document:false */
/*global console:false */
/*global alert:false */

// In strict mode, we must declare the class before we can use it
// Class has to export module and it needs importing to use it
// none of this shit is working something isnt right
// import {StarWarsGame} from './StarWarsGame.js';

// Create game object to run the overall game
var starWarsGame = new StarWarsGame();

$(document).ready(function () {
    // Get user input - must tie to parent ID to not lose on newly created images
    starWarsGame.reset();

    var player = false;
    var enemy = false;

    // must chain to parent to get all even on reset
    $("#characterCards").on("click", ".characterLink", function () {
        // get value
        var characterNbr = ($(this).attr("data-value"));

        if (starWarsGame.currentPlayer == undefined) { // pick a player if not yet picked
            if (starWarsGame.pickAPlayer(characterNbr)) {
                // remove this from available list
                $(this).remove();
            }
        } else {
            if (starWarsGame.pickAnEnemy(characterNbr)) {
                // remove this from available list
                $(this).remove();
            }
        }

    });

    $("#attack-btn").on("click", function () {

        // this just animates the button when its clicked
        var $button = document.querySelector('#attack-btn');
        fancyBtn($button);

        // Attack each other - it wont do anythng if player and enemy are not in place
        starWarsGame.attack();


        // if player is dead - game over
        // if enemy is dead - pick a new enemy
        //    move to defeated list
        // if all defeated, win

        // Attack until enemy or player is dead
    });
});
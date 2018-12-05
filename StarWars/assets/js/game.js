/* **********************************************************************************
 * Main Program - game
 * main is the "view controller" that interacts with web page which is the view
 ********************************************************************************** */

// Create CrystalCollectorGame game object to run the overall game
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

        if (player != undefined && enemy != undefined) {
            // create attack button and set
        }
    });

    $("#attack-btn").on("click", function () {
        // Simulate two attacking each other
        starWarsGame.attack();


        // if player is dead - game over
        // if enemy is dead - pick a new enemy
        //    move to defeated list
        // if all defeated, win

        // Attack until enemy or player is dead
    });
});
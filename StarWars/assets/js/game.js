/* **********************************************************************************
 * Main Program - game
 * main is the "view controller" that interacts with web page which is the view
 ********************************************************************************** */

// Create CrystalCollectorGame game object to run the overall game
var starWarsGame = new StarWarsGame();

$(document).ready(function () {
    // Get user input - must tie to parent ID to not lose on newly created images
    starWarsGame.reset();

    var player;
    var enemy;


    // must chain to parent to get all even on reset
    $("#characters").on("click", ".char-image", function () {
        // get value
        var characterNbr = ($(this).attr("data-value"));

        if (player == undefined) { // pick a player
            player = starWarsGame.pickAPlayer(characterNbr);
            alert("Player: " + player);
            // remove this from available list
            $(this).remove();
            // Put in Player
        } else {
            enemy = starWarsGame.pickAnEnemy(characterNbr);
            alert("Enemy: " + enemy);
            // remove this from available list
            $(this).remove();
            // Put in enemy
        }

        if (player != undefined && enemy != undefined) {
            // create attack button and set
        }
    });

    $("#attack-button").on("click", function () {
        // Simulate two attacking each other
        starWarsGame.attack(player, enemy);


        // if player is dead - game over
        // if enemy is dead - pick a new enemy
        //    move to defeated list
        // if all defeated, win

        // Attack until enemy or player is dead
    });
});
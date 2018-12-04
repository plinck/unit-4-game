/* **********************************************************************************
 * Main Program - game
 * main is the "view controller" that interacts with web page which is the view
 ********************************************************************************** */


// Create CrystalCollectorGame game object to run the overall game
var crystalCollectorGame = new CrystalCollectorGame();

crystalCollectorGame.reset();
crystalCollectorGame.log();

$(document).ready(function () {
    // Get user input - must tie to parent ID to not lose on newly created images
    $("#crystals").on("click", ".crystal-image", function () {

        // get vakue from crystals data-crystalvalue attribute
        var crystalValue = ($(this).attr("data-crystalvalue"));

        crystalCollectorGame.makeAGuess(crystalValue);
    });

});
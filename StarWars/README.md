# Star Wars RPG Game

## Overview

Star Wars is a battle game.  The user first chooses the character they wish to be by clicking on the character's picture. The player will fight as that player for the whole game.  The player then fights each of the remaining characters (the enemies) one at a time.  He chooses the enemy to fight next by clicking their picture.  The character that the player is figthing against is in the `defender_ area` of the page.  

Once the match is started, you click the `attack` button.  Whenever you click attack, it causes damage to the enemy by decreasing their `HP` - health points.  An enemies `HP` is displayed beloew their image.  As soon as you hit attack, the enemy attacks back.  Each time the enemy attacks you, you lose some of your `HP`.  You points are shown beneath your character's picture.

You continue to hit attack until their `HP` goes to zero or below - or your `HP` goes to zero or below.  If their `HP` goes to zero or below, you win.  That enemy is removed from defender area and you pick the next enemuy to fight and do the same thing until you or all opponents are defeated.

* The game restarts whenever the player wins or loses the whole game (i.e. a set of enemies).
* I also keep track of the number of games played and wins and losses.

- - -

### Design Notes

* Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.

* Each time the player attacks, their character's Attack Power increases by its `Base Attack Power`.
  * For example, if the `Base Attack Power` is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
* The enemy character only has `Counter Attack Power`. 

  * Unlike the player's `Attack Points`, `Counter Attack Power` never changes.

* The `Health Points`, `Attack Power` and `Counter Attack Power` of each character must differ.

* No characters in the game can heal or recover Health Points.

### Strategy Notes

* A winning player must pick their characters wisely by first fighting an enemy with low `Counter Attack Power`. This will allow them to gain `Attack Power` and to take on enemies before they lose all of their `Health Points`.

* Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.

- - -

## Linked my responsive portffolio and my bootstrap portfolio sites

I added a portfolio item to both my responsive and bootstrap portfolio.  Both of those have a portfolio item that links to this game.  Just click on the image to open up the game.  You can link to either of them by clicking the links below:

* [Responsvive Portfolio](https://plinck.github.io/Responsive-Portfolio/portfolio.html)
* [Bootstrap Portfolio](https://plinck.github.io/Bootstrap-Portfolio/portfolio.html)

- - -

## Bugs and known issues

* Add feedback when button press - audio and possibly image
* Make the attack button appear only if player and enemy are defined
* Need to refactor code and put stuff in correct classes
* Clean up design
* Dealing with images - I want the **whole card** to be max size smaller and the image to fill its spaee but I cant get it to look right
* ASK INSTRUCTORs - Why does the main (game.js) program have to be at end of body of html page vs in <head> tag

- - -
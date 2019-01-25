# Star Wars RPG Game

## Overview

Star Wars is a battle game.  The user first chooses the character they wish to be by clicking on the character's picture. The player will fight as that player for the whole game.  The player then fights each of the remaining characters (the enemies) one at a time.  He chooses the enemy to fight next by clicking their picture.  The character that the player is figthing against is in the `defender_ area` of the page.  

Once the match is started, you click the `attack` button.  Whenever you click attack, it causes damage to the enemy by decreasing their `HP` - health points.  An enemies `HP` is displayed beloew their image.  As soon as you hit attack, the enemy attacks back.  Each time the enemy attacks you, you lose some of your `HP`.  You points are shown beneath your character's picture.

You continue to hit attack until their `HP` goes to zero or below - or your `HP` goes to zero or below.  If their `HP` goes to zero or below, you win.  That enemy is removed from defender area and you pick the next enemuy to fight and do the same thing until you or all opponents are defeated.

### Live Link
* [Live Demo Link](https://plinck.github.io/unit-4-game/StarWars/)

### Screen Shots
* ![Sample](https://plinck.github.io/unit-4-game/StarWars/assets/images/page1.png)
* ![Sample](https://plinck.github.io/unit-4-game/StarWars/assets/images/page2.png)
* ![Sample](https://plinck.github.io/unit-4-game/StarWars/assets/images/275x200StarWars.png)

### Notes

* The `Health Points`, `Attack Power` and `Base Attack Power` are randomly gerenated at game start and differ for each character.
* Each time the player attacks, their character's Attack Power increases by its `Base Attack Power`.
* The enemy character only has `Counter Attack Power` which does not increase during play.  
* The game restarts whenever the player wins or loses the whole game (i.e. beats a set of enemies or dies).
* I also keep track of the number of games played and wins and losses.

- - -

### Strategy Notes

* To win, a player must pick their characters wisely by first fighting an enemy with low `Counter Attack Power`. This will allow them to gain `Attack Power` and to take on enemies before they lose all of their `Health Points`.

* Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.

- - -

## Linked my responsive portffolio and my bootstrap portfolio sites

I added a portfolio item to both my responsive and bootstrap portfolio.  Both of those have a portfolio item that links to this game.  Just click on the image to open up the game.  You can link to either of them by clicking the links below:

* [Responsvive Portfolio](https://plinck.github.io/Responsive-Portfolio/portfolio.html)
* [Bootstrap Portfolio](https://plinck.github.io/Bootstrap-Portfolio/portfolio.html)

- - -

## Upcoming Features, Bugs and Known Issues

* Add audio fight feedback when attack pressed - audio and possibly image firing
* Refactor code a bit
* Continue to clean up design make it look cooler

- - -

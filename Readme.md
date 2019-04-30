SPACE RUNNER
https://pages.git.generalassemb.ly/OneilCampbell/Project1-SideScrollingGame/


Description:
A side scrolling game in which items are randomly generated on the right edge of the screen and are moved to the left side of the screen where the player is situated. player uses the arrow keys to move to avoid obstacles and collect rewards for points. if they run into an obstacle, the player suffers damage, if the damage reaches or exceeds 100% then the player loses the game, otherwise they player has to accrue ~1000lbs of provisions to win.
https://youtu.be/9rAgq2uUtL4

Game Prompt:
The supply ship that was sent to you, collided with an asteroid belt, and was destroyed; scattering the food everywhere. Those provisions are crucial to your survival. Therefore you must navigate through the asteroid field and collect as much as you can; ideally around 1000lbs of provisions is necessary for sustenance. Be forewarned: Your ship can only sustain so much
damage, before it is destroyed, but it is understood that the asteroid field is unpredictable so try to collide with as few asteroids as possible.

Components:
- Game board
- Images for Player, Obstacle, and Reward
- Provision tracker and damage count
- Logic to move player around
- Logic to generate items randomly
- Logic to move items across screen from left to right
- Logic for Collision Detection
- Win state
- Lose state
- restart game 

Game Start:
- player is on left edge of board and able to move wherever they please within the confines of the game board
- images will start appearing on right side of the screen and move left towards player
- clear and obvious distinction between items to 'get' and ones to 'avoid'

Gameplay:
- using the arrow keys, the player is able to move the spaceship
- point of the game is to avoid the obstacles and collect the rewards for points

Losing:
- if player hits an obstacle the player suffer 10% damage
- if the player accrues damage to their ship totaling 100%, then they lose the game

Winning:
- each provisional item is 50 lbs
- if the player reaches 1000lbs of provisions, then they win

Play Again:
- game is automatically restarted

Functional Components:
- generate-grid-cells() generates the invisible cells(divs) that will comprise the game grid, which is being conceptualized as a 6X6 coordinate grid, and then append them to the DOM

- randomize-items() of the six cells on the right edge, three will have items, the distribution being 1 reward and 2 obstacles (chosen at random), those 3 cells are chosen at random, and their contents will be randomly decided. this function then calls move items function to move the newly created items

- move-items() convert the coordinate positions of the objects into pixels and then apply it to the 'left' property of the corresponding elements in the DOM, decrementing this value each time through the function until the items have moved offscreen

- addEventListener() add event listener to the DOM which checks for a keydown event for the arrow keys. if the event listener is triggered, prevent the default behavior of that key press, and call the move player function

- move-player() when called, based on which key was pressed, either decrement or increment the correspnding coordinate, convert to pixels, and set the 'top' and 'left' properties of the element in the DOM to the newly calculated values

- collision-detection() access the global variable which keeps track of the items currently on the board, if there is a collison, and the item is a provision, add to the provision amount accordingly, if the item is an obstacle, increment the current damage count, and continue the game from it's current state.

- game-over state: if provision amount  >= 1000lbs, you win or if the damage amount is  >= 100%, you lose. the game is then restarted.
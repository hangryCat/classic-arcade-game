// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // The x/y/speed value is declared based on the values passed through the enemy object
    this.x = x;
    // Centers the enemy
    // The 'y' represents the argument being passed by the enemy bug object
    // The number 60 pushes the bug down from wherever the bug currently is
    this.y = y + 65;
    // The speed property/value will be used to pass in the different speed of each enemy
    this.speed = speed;
    // This step property references the size of each tile horizontally
    // The enemy bug will only be moving horizontally (x axis)
    this.step = 101;
    // The boundary for which the enemy bug can move within
    this.boundary = this.step * 5;
    this.resetEnemy = this.step * -1;
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Enemy is not controlled by player so automated code is necessary
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers
        // dt is the function parameter
        // dt is declared in the engine.js file under main() function

    // The following method will check if enemy is still within tiles that are visible to player.
    // If not, then the enemy's x and y pos needs to be reset so it can move across the tiles again (loop).

    // If enemy is still within tile boundaries
    // The code will run if the enemy bug is stil within the boundaries
    // The 5 represent the 6th tile right outside the boundary
        // Starting from the 0 x axis (minus the 1st tile the bug is on 6 - 1 = 5)
    if (this.x < this.boundary) {
        // Move forward
        // Increment x pos by (speed * dt)
        // Multiplying by dt will give the enemy bug a constant speed across the board
            // This happens as the computer loops through the code
        this.x += this.speed * dt;
    }
    else {
      // Reset enemy position to starting point
      // The above if statement will continue to loop
      this.x = this.resetEnemy;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Hero {
    constructor() {
      // Order of what's declared first/last matters

      // horizonStep is the distance between one block to another from the x axis
      // vertStep is the distance between the blocks on the y axis
      this.horizonStep = 101;
      this.vertStep = 83;
      // The following is multiplied by 2 & 4 and moves the player to the tile accordingly
      this.startX = this.horizonStep * 2;
      this.startY = (this.vertStep * 4) + 65;
      // This sets the x and y axis of the player to the starting point of startX/Y
      this.x = this.startX;
      this.y = this.startY;
      // When this is set to true, the player is on the winning y coordinate
      this.victory = false;
      this.sprite = 'images/char-boy.png';
  }
    update() {
        // Access to player's x and y position is available within this constructor
        // However, the enemy objects' x and y position is not
        // In order to access it, a for let-of loop is used
        // this.y === enemy.y
            // Checks to see if the bug and player is on the same y axis
        // enemy.x + enemy.step > this.x
            // Checks to see if the enemy's right side is > than the player's left side
        // enemy.x < this.x + this.vertStep
            // Checks to see if the enemy is < than the player's right side
        // The steps for both enemy/player is reduced by half
            // This way, the area of collision is smaller
            // To the user, the player and enemy actually collides
            // Otherwise, it looks as though the player/enemy doesn't collide
        for (let enemy of allEnemies) {
            if ((this.y === enemy.y) && (enemy.x + enemy.step/2 > this.x) && (enemy.x < this.x + this.vertStep/2)) {
                console.log("COLLISION!");
                this.resetHero();
            }
        }
        // 65 is the offset to center the player
        // 65 - 83 = -18 which is the y-coordinates of the river tiles
        if (this.y === -18) {
            this.victory = true;
            // The timeout function allows the player to reach the river before appearing
            setTimeout(function () {
                alert("CONGRATULATIONS! YOU WON THE GAME!!");
            }, 10);
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        // ctx is for 2d canvas
        // drawImage method has few arguments/parameter
        // The Resources object uses the get method to cache the sprite image as the first argument.\
        // The other 2 arguments are the x and y coordinates specified in the constructor above.
    }

    handleInput(keyPress) {
        // The following could be achieved using a chain of if else statements as well
        // This switch statement checks the value of keyPress
            // If there is a match, then the following code will execute
        switch(keyPress) {
            case 'left':
                // The left boundaries of the x axis is 0
                // The player will not be able to move past 0 (out of boundaries)
                if (this.x > 0) {
                  // Subtracting x would move the character left
                  this.x -= this.horizonStep;
                }
                break;
            case 'right':
                // Using the horizonStep prop help calculate the tiles
                // Left most block starts at 0 and 1 step puts player at the 2nd tiles
                // Therefore, 4 steps/tile over will reach the edge of boundaries
                // If statement will result in false with any tiles beyond that 4th tile
                if (this.x < this.horizonStep * 4) {
                    // Adding to x would move the character right
                    this.x += this.horizonStep;
                }
                break;
            case 'up':
                // The y axis boundaries is 0
                // The player will not be able to move past 0 (out of boundaries)
                if (this.y > 0) {
                    // Decreasing y would move the character up (remember top left corner would be 0,0).
                    this.y -= this.vertStep;
                }
                break;
            case 'down':
                // See comment above for 'right'
                // This is multiplied by 5 instead of 4 because there are more tiles horizontally
                if (this.y < this.vertStep * 4) {
                    // Increasing y would move the character down
                    this.y += this.vertStep;
                }
                break;
        }
    }
    // Once certain conditions are met (collision, win)
    // Player will reset to starting position
    resetHero() {
      this.x = this.startX;
      this.y = this.startY;
    }
}

// HERO CLASS
    // CONSTRUCTOR
        // PROPERTIES
            // x position
            // y position
            // sprite image
        // METHODS
            // update()
                // Updates hero position
                    // Check for collision
                    // Did player x and y collide with enemy x and y?
                // Check for win
                    // Did player's x and y pos reach the correct/final tile?
            // render()
                // Draw player sprite on current x and y coordinate
                    // This method will draw/redraw hero to board every loop through the main game loop. A sprite image of hero and a x/y coord pos.
            // handleInput()
                // Update player's x and y coordinates according to player input.
                    // Handles player's keyboard inputs – The event listener will fire this method and make the necessary changes to the x and y position that corresponds to the direction  player is moving.
            // resetHero()
                // Set x and y to starting position of x and y
                    // For when player makes contact with an enemy or reaches winning tile

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Hero object goes here
    // only need one since there will only ever be one player at a time playing
const player = new Hero();
    // The identifier "player" has to specifically be "player" because that's already referenced in engine.js
        // If name doesn't match, error will pursue
        // If want different name, all "player" identifier must be renamed in engine.js as well

// Empty allEnemies array
const allEnemies = [];

// Enemy bug object created from Enemy constructor
// The arguments here will pass as values in the Enemy constructor
// The value of x and y needs to be the same as what's declared above
// To put the bug in a different spot, just multiply the value
const enemy1 = new Enemy(-101, 0, 200);
const enemy2 = new Enemy((-101 * 3), 83, 300);
const enemy3 = new Enemy(-101, (83 * 2), 400);

// Enemy bugs pushed to allEnemies array
allEnemies.push(enemy1, enemy2, enemy3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

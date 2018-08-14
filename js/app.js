// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

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

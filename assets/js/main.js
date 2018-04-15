var tinydefence = tinydefence || {};

// Define the scaling factor
tinydefence.scalefactor = 2;

// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');

gameScene.preload = function() {
    this.map = new tinydefence.Map(this, 'assets/maps/Level1');
    this.map.preload();
};

gameScene.create = function () {
    this.map.setActive();
};

// our game's configuration
let config = {
    type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
    width: 480 * tinydefence.scalefactor, // game width
    height: 260 * tinydefence.scalefactor, // game height
    scene: gameScene // our newly created scene
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);

tinydefence.game = game;

/*

// Create the phaser engine
tinydefence.game = new Phaser.Game(
    480 * tinydefence.scalefactor, 
    260 * tinydefence.scalefactor, 
    Phaser.AUTO, 'game', null, false, false);

// Define the differnt states
tinydefence.game.state.add("Boot", tinydefence.boot);
tinydefence.game.state.add("Preload", tinydefence.preload);
tinydefence.game.state.add("Menu", tinydefence.menu);
tinydefence.game.state.add("Game", tinydefence.rungame);

tinydefence.game.model = {
    currentMapIndex: 0,
    money: 150,
    currentWave: 0,
    lives: 10,
}

tinydefence.game.state.start("Boot");
*/

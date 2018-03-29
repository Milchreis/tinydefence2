var tinydefence = tinydefence || {};

// Define the scaling factor
tinydefence.scalefactor = 2;

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

tinydefence.constants = {
    TILE_WIDTH: 16,
    TILE_HEIGHT: 16,
}

tinydefence.game.model = {
    currentMapIndex: 1,
    money: 150,
    currentWave: 0,
    lives: 10,
}

tinydefence.game.state.start("Boot");

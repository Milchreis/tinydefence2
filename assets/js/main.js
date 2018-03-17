var tinydefence = tinydefence || {};

tinydefence.game = new Phaser.Game(480, 260, Phaser.AUTO, 'game', null, false, false);


tinydefence.game.state.add("Boot", tinydefence.boot);
tinydefence.game.state.add("Preload", tinydefence.preload);
tinydefence.game.state.add("Menu", tinydefence.menu);
tinydefence.game.state.add("Game", tinydefence.rungame);

tinydefence.game.model = {
    currentMapIndex: 0,
    money: 150,
    currentWave: 0,
    lives: 10
}

tinydefence.game.state.start("Boot");

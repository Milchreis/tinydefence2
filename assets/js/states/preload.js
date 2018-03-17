var tinydefence = tinydefence || {};

tinydefence.preload = function(game) {};

tinydefence.preload.prototype = {

	preload: function() {
		this.game.load.image('sprites', 'assets/images/sprites.png');
		this.game.load.image('terrain', 'assets/images/terrain.png');
		this.game.load.image('way', 'assets/images/way.png');
		this.game.load.image('logo', 'assets/images/logo.png');
		this.game.load.image('bullet', 'assets/images/bullet.png');
		this.game.load.spritesheet('selection', 'assets/images/selection.png', 16, 16);
		this.game.load.spritesheet('tower', 'assets/images/tower.png', 16, 16);
		this.game.load.spritesheet('enemy', 'assets/images/enemy.png', 16, 16);

		this.game.load.bitmapFont('font1', 
			'assets/fonts/font.png',
			'assets/fonts/font.fnt');

		// Load all defined maps in maps.js
		tinydefence.maps.forEach(map => {
			this.game.load.tilemap(map.key, map.data, null, Phaser.Tilemap.TILED_JSON);
			this.game.load.image(map.key + '_sprites', map.sprite);
		});
	},
	
	create: function() {
		this.game.state.start("Menu");
	}
}
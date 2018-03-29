var tinydefence = tinydefence || {};

tinydefence.preload = function(game) {};

tinydefence.preload.prototype = {

	preload: function() {
		this.game.load.image('logo', 'assets/images/logo.png');
		this.game.load.spritesheet('selection', 'assets/images/selection.png', 16, 16);
		this.game.load.spritesheet('enemy', 'assets/images/enemy.png', 16, 16);
		this.game.load.spritesheet('crab', 'assets/images/enemyCrab.png', 16, 16);
		
		this.game.load.image('buildmenu', 'assets/images/ui/menuElements.png');
		this.game.load.spritesheet('buildmenuButtons', 'assets/images/ui/menuButtons.png', 16, 16);

		this.game.load.spritesheet('buttonCoverage', 'assets/images/ui/buttonCoverage.png', 32, 18);
		this.game.load.spritesheet('buttonLevel', 'assets/images/ui/buttonLevel.png', 225, 35);
		this.game.load.spritesheet('buttonMenuNav', 'assets/images/ui/buttonMenuNav.png', 20, 18);

		this.game.load.bitmapFont('font_white', 
			'assets/fonts/font.png',
			'assets/fonts/font.fnt');
		this.game.load.bitmapFont('font_green', 
			'assets/fonts/font_green.png',
			'assets/fonts/font_green.fnt');
		this.game.load.bitmapFont('font_red', 
			'assets/fonts/font_red.png',
			'assets/fonts/font_red.fnt');

		// Load all defined maps in maps.js
		tinydefence.maps.forEach(map => {
			this.game.load.tilemap(map.key, map.data, null, Phaser.Tilemap.TILED_JSON);
			this.game.load.image(map.key + '_sprites', map.sprite);
		});

		// Load all tower assets
		tinydefence.towerManager.load();
	},
	
	create: function() {
		this.game.state.start("Menu");
	}
}
var tinydefence = tinydefence || {};

tinydefence.preload = function(game) {};

tinydefence.preload.prototype = {

	preload: function() {
		this.game.load.image('logo', 'assets/images/logo.png');
		this.game.load.image('bullet', 'assets/images/bullet.png');
		this.game.load.spritesheet('selection', 'assets/images/selection.png', 16, 16);
		this.game.load.spritesheet('tower', 'assets/images/tower.png', 16, 16);
		this.game.load.spritesheet('enemy', 'assets/images/enemy.png', 16, 16);
		this.game.load.spritesheet('crab', 'assets/images/enemyCrab.png', 16, 16);

		this.game.load.spritesheet('buttonCoverage', 'assets/images/buttonCoverage.png', 32, 18);
		this.game.load.spritesheet('buttonLevel', 'assets/images/buttonLevel.png', 225, 35);
		this.game.load.spritesheet('buttonMenuNav', 'assets/images/buttonMenuNav.png', 20, 18);

		this.game.load.bitmapFont('font_white', 
			'assets/fonts/font.png',
			'assets/fonts/font.fnt');
		this.game.load.bitmapFont('font_green', 
			'assets/fonts/font_green.png',
			'assets/fonts/font_green.fnt');
		this.game.load.bitmapFont('font_red', 
			'assets/fonts/font_red.png',
			'assets/fonts/font_red.fnt');

		// Load all map assets
        tinydefence.mapManager.forEach(map => {
            let mapProperties = this.game.cache.getJSON(map.key + '_properties');
            map.label = mapProperties.label;
            map.lives = mapProperties.lives;
            map.layers = mapProperties.layers;
            map.waves = mapProperties.waves;

            let path = 'assets/maps/' + map.key + '/';
            map.tilemap = map.key + '_tilemap';
            map.spritesheet = map.key + '_spritesheet';
            this.game.load.tilemap(map.tilemap, path + 'tilemap.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image(map.spritesheet, path + 'spritesheet.png');

        });
	},
	
	create: function() {
		this.game.state.start("Menu");
	}
}
var tinydefence = tinydefence || {};

tinydefence.preload = function(game) {};

tinydefence.preload.prototype = {

	preload: function() {
		this.game.load.image('logo', 'assets/images/logo.png');
		this.game.load.spritesheet('selection', 'assets/images/selection.png', 16, 16);
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

		// Load all defined maps in maps.js
		tinydefence.maps.forEach(map => {
			this.game.load.tilemap(map.key, map.data, null, Phaser.Tilemap.TILED_JSON);
			this.game.load.image(map.key + '_sprites', map.sprite);
		});

		// Load all towers
        tinydefence.towerManager.forEach(tower => {
            let towerProperties = this.game.cache.getJSON(tower.key + '_properties');
            tower.color = towerProperties.color;
            tower.tiers = towerProperties.tiers;

            towerProperties.tiers.forEach((tier, i) => {
            	// TODO tier specific spritesheets
            	let path = 'assets/towers/' + tower.key + '/';
            	tier.spritesheet_tower = tower.key + '_' + i  + '_spritesheet_tower';
            	tier.spritesheet_shot = tower.key + '_' + i  + '_spritesheet_shot';

                this.game.load.spritesheet(tier.spritesheet_tower, path + tier.sprites.tower, 16, 16);
                this.game.load.image(tier.spritesheet_shot, path + tier.sprites.shot);
            });
        });
	},
	
	create: function() {
		this.game.state.start("Menu");
	}
}
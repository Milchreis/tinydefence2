var tinydefence = tinydefence || {};

tinydefence.preload = function(game) {};

tinydefence.preload.prototype = {

	preload: function() {
		this.game.load.image('logo', 'assets/images/logo.png');
		this.game.load.spritesheet('selection', 'assets/images/selection.png', 16, 16);
		this.game.load.spritesheet('enemy', 'assets/images/enemy.png', 16, 16);
		this.game.load.spritesheet('crab', 'assets/images/enemyCrab.png', 16, 16);
		this.game.load.spritesheet('buttonCoverage', 'assets/images/ui/buttonCoverage.png', 32, 18);
		
		this.game.load.image('buildmenu', 'assets/images/ui/menuElements.png');
		this.game.load.spritesheet('buildmenuButtons', 'assets/images/ui/menuButtons.png', 16, 16);

		this.game.load.spritesheet('Cannon_0_tower', 'assets/towers/Cannon/tower_1.png', 16, 16);
		this.game.load.image('Cannon_0_shot', 'assets/towers/Cannon/bullet_1.png');

		tinydefence.towers.forEach(tower => {
			this.game.load.json(tower.key + '_json', 'assets/towers/' + tower.key + '/properties.json');
		});

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
	},
	
	create: function() {
		this.game.state.start("Menu");

		// Load all defined towers in tower.js
		tinydefence.towers.forEach(tower => {
			let t = this.game.cache.getJSON(tower.key + '_json');

			t.tiers.forEach((tier, i) => {

				console.log('KEY: ' + tower.key + '_' + i + '_tower');
				console.log('VALUE: ' + 'assets/towers/' + tower.key + '/' + tier.sprites.tower);

				this.game.load.spritesheet(
					tower.key + '_' + i + '_tower',
					'assets/towers/' + tower.key + '/' + tier.sprites.tower, 16, 16);
				this.game.load.image(
					tower.key + '_' + i + '_shot',
					'assets/towers/' + tower.key + '/' + tier.sprites.shot);
			});

			tower.color = t.color;
			tower.tiers = t.tiers;
		});
	}
}
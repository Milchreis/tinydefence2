class MapManager {

	constructor(game) {
		this.game = game;

		this.maps = [
		    {
		        key: 'Level1'
		    },
		    {
		    	key: 'BeachDefense'
		    }
		];

		this.maps.forEach(map => {
			this.game.load.json(map.key + '_properties', 'assets/maps/' + map.key + '/properties.json');
		});
	}

	load() {
		this.maps.forEach(map => {
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
	}

	getMaps() {
		return this.maps;
	}
}
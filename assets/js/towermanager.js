class TowerManager {

	constructor(game) {
		this.game = game;

		this.towerTypes = [
		    {
		        key: 'Cannon'
		    }
		];

		this.towerTypes.forEach(tower => {
			this.game.load.json(tower.key + '_properties', 'assets/towers/' + tower.key + '/properties.json');
		});
	}

	load() {
		this.towerTypes.forEach(tower => {
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
	}

	getTowerType(typeName) {
		return this.towerTypes.find(tower => tower.key === typeName);
	}
}

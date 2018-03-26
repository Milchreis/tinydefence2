var tinydefence = tinydefence || {};

tinydefence.boot = {

	preload: function() {
		this.game.load.image("loading", "assets/images/loading.png");

		// Load all tower properties
		tinydefence.towerManager.forEach(tower => {
			this.game.load.json(tower.key + '_properties', 'assets/towers/' + tower.key + '/properties.json');
		});
	},
  
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.renderer.renderSession.roundPixels = true;
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
		this.game.state.start("Preload");
	}
};
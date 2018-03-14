var tinydefence = tinydefence || {};

tinydefence.boot = {

	preload: function() {
		this.game.load.image("loading", "assets/images/loading.png");
	},
  
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.renderer.renderSession.roundPixels = true;
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
		this.game.state.start("Preload");
	}
};
var tinydefence = tinydefence || {};

tinydefence.menu = {

	create: function() {
		// Set cavans background
		this.game.stage.backgroundColor = "#1e1a17";
		
		// Load logo
		this.logo = this.game.add.sprite(60, 60, 'logo');

		this.levelselection = new LevelSelection();
		this.levelselection.setOnLevelSelected((map, index) => {
			tinydefence.game.model.currentMapIndex = index;
			this.game.state.start("Game");
		});
	},
	
	addTweens: function() {
		// Incoming logo with bouncing effect
		// Currently not used, because it's to much with tweened level selection
		this.game.add.tween(this.logo)
			.from({y: -300}, 1800, Phaser.Easing.Bounce.Out, true, 250);
	},
};
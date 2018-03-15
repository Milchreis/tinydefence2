var tinydefence = tinydefence || {};

tinydefence.menu = {

	create: function() {
		// Set cavans background
		this.game.stage.backgroundColor = "#1e1a17";
		
		// Load logo
		this.logo = this.game.add.sprite(this.game.width / 2, this.game.height/2, 'logo');
		this.logo.anchor.x = 0.5;
		this.logo.anchor.y = 0.5;
	
		this.text = this.game.add.bitmapText(
            4, this.game.height - 16,
            'font1', 
            "Click or press to start",
			16);
	},
	
	update: function() {

		if(this.game.input.pointer1.isDown || this.game.input.mousePointer.isDown) {
            this.game.state.start("Game");
        }
	},
};
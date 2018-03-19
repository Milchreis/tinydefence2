class UIOverlay {

    constructor(x, y, text, game, size, time, easingIn, easingOut) {
        // Position
        this.x = x;
        this.y = y;

        this.finished = false;
        this.liveTime = time || 300;
        this.easingIn = easingIn || Phaser.Easing.Back.In;
        this.easingOut = easingOut || Phaser.Easing.Back.Out;

        this.size = size || 16;
        this.yOffset = 30;
        this.xOffset = 0;

        this.game = game;

        this.text = this.game.add.bitmapText(
            x, y,
            'font_white', 
            text,
            size);

        this.text.anchor.setTo(0.5, 0.5);

        this.text.visible = false;
    }
    
    start() {
        this.endTime = this.game.time.now + this.liveTime;
        this.text.visible = true;
        this.text.alpha = 0.0;
        this.game.add.tween(this.text)
            .to({ alpha: 1, 
                x: this.text.x - this.xOffset,  
                y: this.text.y - this.yOffset
            }, 75, this.easing, true);
        return this;
    }

    update() {
        // Skip if the overlay isn't started
        if(this.endTime === undefined) {
            return;
        }

        if(this.game.time.now > this.endTime) {
            // Play stop tween
            this.game.add.tween(this.text)
                .to({
                    alpha: 0, 
                    y: this.text.y + this.yOffset, 
                    x: this.text.x + this.xOffset
                }, 250, this.easing, true);
                
            // stop
            this.finished = true;
        }
    }

}
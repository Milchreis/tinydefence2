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
    
    start(inMillis) {
        inMillis = inMillis || 0;

        this.text.visible = true;
        this.text.alpha = 0.0;
        
        this.game.time.events.add(inMillis, this.playInTween, this);
        this.game.time.events.add(inMillis + this.liveTime , this.playOutTween, this);
        
        return this;
    }
    
    playOutTween() {
        this.game.add.tween(this.text)
        .to({
            alpha: 0, 
            y: this.text.y + this.yOffset, 
            x: this.text.x + this.xOffset
        }, 250, this.easing, true);
    }
    
    playInTween() {
        this.game.add.tween(this.text)
        .to({ alpha: 1, 
            x: this.text.x - this.xOffset,  
            y: this.text.y - this.yOffset
        }, 75, this.easing, true);

    }

}
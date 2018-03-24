class LevelSelection {

    constructor() {

		this.levelsPerSite = 5;
		this.numberOfColumns = 1;
		this.currentPageIndex = 0;
        this.maps = [];
        this.levelSelectedCallback = null;
        
        this.x = 380;
        this.y = 50;
        
        this.nextButton = tinydefence.game.add.button(
            this.x + 300, 
            tinydefence.game.height- 50, 
            'buttonMenuNav', this.nextMaps, 
            this, 1, 0, 2);

        this.nextButton.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);
        this.nextButton.visible = false;
        
        this.previousButton = tinydefence.game.add.button(
            this.x + 200,
            tinydefence.game.height- 50, 
            'buttonMenuNav', this.previousMaps, 
            this, 1, 0, 2);
            
        this.previousButton.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);
        this.previousButton.scale.x *= -1;
        this.previousButton.visible = false;
        
        this.loadMaps();
    }
    
    loadMaps() {
        this.maps = tinydefence.maps.slice(this.currentPageIndex * this.levelsPerSite, (this.currentPageIndex+1) * this.levelsPerSite);
        this.buttons = [];
        
        this.maps.forEach((m, i) => {
            let group = tinydefence.game.add.group();
            
            let button = tinydefence.game.add.button(
                this.x + 30, 
                this.y + (i * 80), 
                'buttonLevel', () => this.onLevelClicked(m), 
                this, 1, 0, 0);
            button.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);
        
            let text = tinydefence.game.add.bitmapText(
                this.x + 170, 
                this.y + 25 + (i * 80), 
                'font_white', m.name, 32);
                
            group.add(button);
            group.add(text);

            this.buttons.push(group);
        });

        this.buttons.forEach((button, i) => {
            tinydefence.game.add.tween(button)
                .from({y: tinydefence.game.height + 50}, 1500, Phaser.Easing.Cubic.Out, true, i*250);
            });
        
        this.nextButton.visible = this.hasNextPage();
        this.previousButton.visible = this.hasPreviousPage();
    }

    hasNextPage() {
        return this.currentPageIndex + 1 < tinydefence.maps.length/this.levelsPerSite;
    }

    hasPreviousPage() {
        return this.currentPageIndex > 0;
    }

    nextMaps() {
        if(this.hasNextPage()) {
            this.currentPageIndex++;
            this.createHideAnimation();
            this.loadMaps();
        }
    }

    previousMaps() {
        if(this.hasPreviousPage()) {
            this.currentPageIndex--;
            this.createHideAnimation();
            this.loadMaps();
        }
    }
    
    createHideAnimation() {
        this.buttons.forEach((button) => {
            let tween = tinydefence.game.add.tween(button)
                .to({alpha: 0.0}, 300, Phaser.Easing.Cubic.Out, true);
            tween.onComplete.add(() => {button.removeAll()}, this);
        });
    }

    onLevelClicked(map) {
        this.levelSelectedCallback(map, tinydefence.maps.findIndex(m => m.key === map.key));
    }

    setOnLevelSelected(callback) {
        if(typeof callback === 'function') {
            this.levelSelectedCallback = callback;
        }
    }
}
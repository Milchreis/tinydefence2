class LevelSelection {

    constructor() {

		this.numberPerSite = 9;
		this.numberOfColumns = 1;
		this.currentPageIndex = 0;
        this.maps = [];
        this.levelSelectedCallback = null;
        
        this.loadMaps();
    }
    
    loadMaps() {
        this.x = 380;

        this.maps = tinydefence.maps.slice(this.currentPageIndex * this.numberOfColumns, (this.currentPageIndex+1) * this.numberPerSite);
        this.buttons = [];
    
        this.maps.forEach((m, i) => {
            let group = tinydefence.game.add.group();
    
            let button = tinydefence.game.add.button(
                this.x + 30, 
                70 + (i * 80), 
                'buttonLevel', () => this.onLevelClicked(m), 
                this, 1, 0, 0);
            
                let text = tinydefence.game.add.bitmapText(
                    this.x + 170, 
                    95 + (i * 80), 
                    'font_white', m.name, 32);
                
            group.add(button);
            group.add(text);

            this.buttons.push(group);
        });

        this.buttons.forEach((button, i) => {
            tinydefence.game.add.tween(button)
                .from({y: tinydefence.game.height + 50}, 1500, Phaser.Easing.Cubic.Out, true, i*250);
        });
    }

    nextMaps() {
        this.currentPageIndex = this.currentPageIndex < tinydefence.maps.length/this.numberPerSite ? 
            this.currentPageIndex + 1 : this.currentPageIndex;
        this.loadMaps();
    }

    previousMaps() {
        this.currentPageIndex = this.currentPageIndex > 0 ? this.currentPageIndex - 1 : this.currentPageIndex;
        this.loadMaps();
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
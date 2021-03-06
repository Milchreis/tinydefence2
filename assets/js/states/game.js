var tinydefence = tinydefence || {};

tinydefence.rungame = {

    preload: function() {
    },

    create: function() {
        // Set cavans background
        this.game.stage.backgroundColor = "#1e1a17";

        this.game.time.advancedTiming = true;
        this.game.time.desiredFps = 60;
        this.game.time.slowMotion = 1.0;
        
        // Create a copy of the intial game settings
        this.model = {
            currentMapIndex: tinydefence.game.model.currentMapIndex,
            money: tinydefence.game.model.money,
            currentWave: tinydefence.game.model.currentWave,
            lives: tinydefence.game.model.lives,
        }
        
        tinydefence.game.ui = new UI(tinydefence.game);
        
        this.gameEnd = false;
       
        this.createMap();

        this.model.currentWave = -1;
        this.nextWaveOrLevel();
    },

    createMap() {
        // Load current map
        this.currentMap = tinydefence.maps[this.model.currentMapIndex];
        
        // Create tilemap
        this.map = this.game.add.tilemap(this.currentMap.key);
        this.map.addTilesetImage('Sprites', this.currentMap.key + '_sprites');
        this.layer = this.map.createLayer('Level');
        this.layer.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);
        
        let mapdata = this.game.cache.getTilemapData(this.currentMap.key).data.layers[0].data;
        let waypointdata = this.game.cache.getTilemapData(this.currentMap.key).data.layers[1].data;

        this.defencegame = new DefenceGame(
            tinydefence.constants.TILE_WIDTH * tinydefence.scalefactor, 
            tinydefence.constants.TILE_HEIGHT * tinydefence.scalefactor, 
            30, 15, mapdata, waypointdata, this.game, this.model);

        tinydefence.game.world.bringToTop(tinydefence.game.ui.buttonCoverage);
    },

    nextWaveOrLevel() {

        this.model.currentWave += 1;

        // Next map if no next wave exists and if next map is in array
        if(this.model.currentWave >= this.currentMap.waves.length 
            && this.model.currentMapIndex + 1 < tinydefence.maps.length) {

            // Next map/level
            this.model.currentMapIndex++;
            this.createMap();
            
            // Soft reset the game model for the next level            
            this.model.money = tinydefence.game.model.money;
            this.model.lives = tinydefence.game.model.lives;
            this.model.currentWave = 0;
        }

        // Next wave if exists
        if(this.model.currentWave < this.currentMap.waves.length) {

            // Get current wave and create a clone
            this.wave = Object.assign({}, this.currentMap.waves[this.model.currentWave]);
    
            this.nextEnemy = this.game.time.now;
            this.wavestart = this.game.time.now + 5000;
        }
    },
    
    update: function() {
        
        // Go back to menu on click if the game is over
        if(this.gameEnd && (this.game.input.pointer1.isDown || this.game.input.mousePointer.isDown)) {
            this.game.state.start("Menu");
        }

        // Get a small warm up phase
        if(this.game.time.now < this.wavestart) {
            
            let now = Math.floor((this.wavestart - this.game.time.now)/1000);

            if(this.last !== undefined && now !== this.last && now <= 3) {
                
                let overlay = null;
                // In the first wave show the centered big countdown
                if(this.model.currentWave === 0) {
                    overlay = new UIOverlay(this.game.width/2, this.game.height/2, now, this.game, 128);
                    // Add a "Build" in the last run
                    if(now === 1) {
                        let buildOverlay = new UIOverlay(this.game.width/2, this.game.height/2, "BUILD", this.game, 128);
                        tinydefence.game.ui.addOverlay(buildOverlay.start(1000));
                    }
                // Add a small countdown in the infobar in all other waves
                } else {
                    let wavetext = tinydefence.game.ui.waveText;
                    overlay = new UIOverlay(wavetext.x + wavetext.width + 20, wavetext.y, now, this.game, 32);
                    overlay.text.anchor.setTo(0, 0);
                    overlay.yOffset = 0;
                }
                tinydefence.game.ui.addOverlay(overlay.start());
            }
            
            this.last = Math.floor((this.wavestart - this.game.time.now)/1000);
            
        } else {
            // Drop new enemies?
            if(this.game.time.now > this.nextEnemy && this.wave.maxEnemies > 0) {
                this.wave.maxEnemies -= 1;
                this.defencegame.addEnemy(this.wave.enemyHealth, this.wave.enemySpeed, this.wave.points, this.wave.type);
                this.nextEnemy = this.game.time.now + this.wave.dropInMillis;
            }
    
            // All enemies dead?
            if(this.defencegame.enemies.length === 0 && this.gameEnd === false) {
                // Give a little bonus to frugal players
                let bonus = Math.round(this.model.money * 0.1);
                this.model.money += bonus;

                let moneytext = tinydefence.game.ui.moneyText;
                let overlay = new UIOverlay(moneytext.x + moneytext.width, moneytext.y, "+" + bonus, this.game);
                overlay.text.anchor.setTo(1, 1);

                tinydefence.game.ui.addOverlay(overlay.start());
    
                this.nextWaveOrLevel();
            }
        }
        
        this.defencegame.update();
        
        // Update score
        // // TODO nicht bei jedem update zyklus sondern nur wenn sich wirklich was ändert
        tinydefence.game.ui.setCurrentWave(this.model.currentWave+1);
        tinydefence.game.ui.setMaxWave(this.currentMap.waves.length);
        tinydefence.game.ui.setMoney(this.model.money);
        tinydefence.game.ui.setLives(this.model.lives);
            
        if(this.model.currentWave > this.currentMap.waves.length) {
            tinydefence.game.ui.setFullText("You won the game");
            this.gameEnd = true;
        }
        
        // Is the player dead?
        if(this.model.lives <= 0) {
            tinydefence.game.ui.setFullText("You lost the game");
            this.gameEnd = true;
        }
    },  

    render: function() {

        if(tinydefence.constants.DEBUG) {
            this.game.debug.text('render FPS: ' + (this.game.time.fps || '--') , 2, 14, "#00ff00");
        
            if (this.game.time.suggestedFps !== null) {
                this.game.debug.text('suggested FPS: ' + this.game.time.suggestedFps, 2, 28, "#00ff00");
                this.game.debug.text('desired FPS: ' +   this.game.time.desiredFps, 2, 42, "#00ff00");
            }
        
        }
    }
}
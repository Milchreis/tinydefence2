var tinydefence = tinydefence || {};

tinydefence.rungame = {

    preload: function() {
    },

    create: function() {
        // Set cavans background
        this.game.stage.backgroundColor = "#1e1a17";
        
        // Load current map
        this.currentMap = tinydefence.maps[tinydefence.game.model.currentMapIndex];
        
        // Create tilemap
        this.map = this.game.add.tilemap(this.currentMap.key);
        this.map.addTilesetImage('Sprites', this.currentMap.key + '_sprites');
        this.layer = this.map.createLayer('Level');
        
        let mapdata = this.game.cache.getTilemapData(this.currentMap.key).data.layers[0].data;
        let waypointdata = this.game.cache.getTilemapData(this.currentMap.key).data.layers[1].data;
        
        this.model = {
            currentMapIndex: tinydefence.game.model.currentMapIndex,
            money: tinydefence.game.model.money,
            currentWave: tinydefence.game.model.currentWave,
            lives: tinydefence.game.model.lives,
        }
        
        this.defencegame = new DefenceGame(16, 16, 30, 15, mapdata, waypointdata, this.game, this.model);
        this.gameEnd = false;
        
        this.model.currentWave = -1;
        this.nextWave();
        
        this.scoreText = this.game.add.bitmapText(
            4, this.game.height - 16,
            'font1', 
            "",
            16);
    },

    nextWave() {
        if(this.model.currentWave < this.currentMap.waves.length) {

            this.model.currentWave += 1;
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
            console.log("start in " + Math.floor((this.wavestart - this.game.time.now)/1000));
            
        } else {

            // Drop new enemies?
            if(this.game.time.now > this.nextEnemy && this.wave.maxEnemies > 0) {
                this.wave.maxEnemies -= 1;
                this.defencegame.addEnemy(this.wave.enemyHealth, this.wave.enemySpeed, this.wave.points);
                this.nextEnemy = this.game.time.now + this.wave.dropInMillis;
            }
    
            // All enemies dead?
            if(this.defencegame.enemies.length === 0 && this.gameEnd === false) {
                this.nextWave();
                // Give a little bonus to frugal players
                this.model.money += Math.round(this.model.money * 0.1);
            }
        }
        
        this.defencegame.update();
        
        // Update score
        this.scoreText.setText(
            `Wave: ${this.model.currentWave+1}/${this.currentMap.waves.length}     $: ${this.model.money}     Lives: ${this.model.lives}`);
            
        if(this.model.currentWave > this.currentMap.waves.length) {
            this.scoreText.setText("You won the game");
            this.gameEnd = true;
        }
        
        // Is the player dead?
        if(this.model.lives <= 0) {
            this.scoreText.setText("You lost the game");
            this.gameEnd = true;
        }
    },
        
}
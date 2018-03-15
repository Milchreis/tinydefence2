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
        this.map.addTilesetImage('Sprites', 'sprites');
        this.layer = this.map.createLayer('Level');
        
        let mapdata = this.game.cache.getTilemapData(this.currentMap.key).data.layers[0].data;
        let waypointdata = this.game.cache.getTilemapData(this.currentMap.key).data.layers[1].data;
        
        this.defencegame = new DefenceGame(16, 16, 30, 15, mapdata, this.game);
        
        this.model = tinydefence.game.model;
        this.model.currentWave = -1;
        this.nextWave();
        
        this.scoreText = this.game.add.bitmapText(
            4, this.game.height - 16,
            'font1', 
            "",
            16);
    },

    nextWave() {
        this.model.currentWave += 1;
        // Get current wave and create a clone
        this.wave = Object.assign({}, this.currentMap.waves[this.model.currentWave]);

        this.nextEnemy = this.game.time.now;
        this.wavestart = this.game.time.now + 5000;
    },
    
    update: function() {
        
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
            if(this.defencegame.enemies.length === 0) {
                this.nextWave();
            }
        }
        
        this.defencegame.update();
        
        // Update score
        this.scoreText.setText(
            `Wave: ${this.model.currentWave+1}/${this.currentMap.waves.length}     $: ${this.model.points}`);
            
        if(this.model.currentWave > this.currentMap.waves.length) {
            this.scoreText.setText("You won the game");
        }
        
        // Is the player dead?
        if(this.defencegame.enemies.filter(e => e.targetReached).length > this.model.lives) {
            this.scoreText.setText("You lost the game");
        }
    },
        
}
class DefenceGame {
    
    constructor(tileWidth, tileHeight, width, height, map, game) {
        
        this.game = game;
        this.twidth = tileWidth || 16;
        this.theight = tileHeight || 16;
        this.width = width;
        this.height = height;
        
        this.map = map;
        this.mapMeta = tinydefence.maps[tinydefence.game.model.currentMapIndex];

        this.towermap = new Array(map.length);
        this.towers = [];
        
        this.enemies = [];

        this.waypoints = getWaypoints(this.mapMeta.start, this.mapMeta.end, this);

        this.selector = this.game.add.sprite(0, 0, 'selection');
        this.game.physics.arcade.enable(this.selector, Phaser.Physics.ARCADE);
        
        this.animation = this.selector.animations.add('idle', [0, 1], 8, true);
        this.selector.animations.play('idle');
    }

    addTower(tower, x, y) {
        this.set(tower, x, y, this.towermap);
        this.towers.push(tower);
    }

    addEnemy(health, enemySpeed, points) {
        let enemy = new Enemy(this.game, this.waypoints);
        enemy.maxhealth = health || enemy.sprite.health;
        enemy.sprite.health = enemy.maxhealth;
        enemy.speed = enemySpeed || enemy.speed;
        enemy.points = points || enemy.points;
        this.enemies.push(enemy);
    }

    update() {
        // Get mouse position on tilemap
        let cursor = this.getCursor();
        let x = cursor.x;
        let y = cursor.y;
        
        // Draw selector for free fields
        this.drawSelector(x, y);

        // Check input
        if(this.game.input.pointer1.isDown || this.game.input.mousePointer.isDown) {
            this.onClick(x, y);
        }

        // Update towers
        let selectedTower = this.get(x, y, this.towermap);
        this.towers.forEach(t => {
            if(t.focusedEnemy === undefined) {
                t.searchForEnemy(this.enemies);
            }
            
            t.update();

            if(selectedTower !== undefined && selectedTower === t) {
                t.onHover();
            }
        });

        // Update enemies
        this.enemies.filter(e => e.sprite.health <= 0.0).forEach(e => {
            e.die();
            tinydefence.game.model.points += e.points;
        });
        this.enemies = this.enemies.filter(e => e.sprite.health > 0.0);
        this.enemies.forEach(e => e.update());
    }

    onClick(x, y) {
        if(this.isFieldFree(x, y)) {
            let tower = new Tower(this.game, x * this.twidth, y * this.twidth);

            if(tinydefence.game.model.points >= tower.price) {
                console.log("buy");
                this.addTower(tower, x, y);
                tinydefence.game.model.points -= tower.price;
            } else {
                console.log("not enougth money");
                tower.sprite.destroy();
                tower = {};
            }
        }
    }

    drawSelector(x, y) {
        if(this.isFieldFree(x, y)) {
            this.selector.visible = true;
            this.selector.body.x = x*this.twidth;
            this.selector.body.y = y*this.theight;
        } else {
            this.selector.visible = false;
        }
    }

    isTower(x, y) {
        let tower = this.get(x, y, this.towermap);
        return tower !== undefined;
    }

    isFieldFree(x, y) {
        let tile = this.get(y, x, this.map);
        let tower = this.get(x, y, this.towermap);
        return !(tile === 2 || tile === 3 || tower !== undefined);
    }

    getTile(x, y) {
        return this.get(y, x, this.map);
    }

    get(x, y, map) {
        return map[x*this.width + y];
    }

    set(value, x, y, map) {
        map[x*this.width + y] = value;
    }

    getCursor() {
        let x = Math.floor((this.game.input.x * this.game.scale.parentScaleFactor.x) / this.twidth);
        let y = Math.floor((this.game.input.y * this.game.scale.parentScaleFactor.y) / this.theight); 
        // Contraints
        x = x >= this.width ? this.width-1 : x; 
        y = y >= this.height ? this.height-1 : y; 

        return {x: x, y: y};
    }
}
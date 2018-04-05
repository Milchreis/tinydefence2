class DefenceGame {
    
    constructor(tileWidth, tileHeight, width, height, map, waypointData, game, model) {
        
        this.game = game;
        this.twidth = tileWidth || 16;
        this.theight = tileHeight || 16;
        this.width = width;
        this.height = height;
        
        this.map = map;
        this.waypointData = waypointData;
        this.model = model;
        this.mapMeta = tinydefence.maps[this.model.currentMapIndex];

        this.towermap = new Array(map.length);
        this.towers = [];
        
        this.enemies = [];

        this.waypoints = getWaypoints(this.mapMeta.start, this.mapMeta.end, this);

        this.selector = this.game.add.sprite(0, 0, 'selection');
        this.selector.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);
        this.game.physics.arcade.enable(this.selector, Phaser.Physics.ARCADE);
        
        this.animation = this.selector.animations.add('idle', [0, 1], 8, true);
        this.selector.animations.play('idle');

        this.wasButtonDown = false;

        // Events for build menu
        this.initBuildmenuButtons();
    }

    addTower(tower, x, y) {
        this.set(tower, x, y, this.towermap);
        this.towers.push(tower);
    }
    
    removeTower(tower, x, y) {
        this.set(undefined, x, y, this.towermap);
        this.towers = this.towers.filter(e => e !== tower);
        tower.sprite.destroy();
    }

    addEnemy(health, enemySpeed, points, type) {
        let enemy = new Enemy(this.game, this.waypoints, type);
        enemy.maxhealth = health || enemy.sprite.health;
        enemy.sprite.health = enemy.maxhealth;
        enemy.speed = enemySpeed || enemy.speed;
        enemy.points = points || enemy.points;
        enemy.onTargetReached(() => this.model.lives -= 1);
        this.enemies.push(enemy);
    }

    update() {
        // Update towers
        this.towers.forEach(t => {
            if(t.focusedEnemy === undefined) {
                t.searchForEnemy(this.enemies);
            }
            t.update();
        });
        
        // Get mouse position on tilemap
        let cursor = this.getCursor();
        let x = cursor.x;
        let y = cursor.y;
      
        if(x !== null && y != null && !tinydefence.game.ui.isOverMenu) {
            // Draw selector for free fields
            this.drawSelector(x, y);
            this.checkInput(x, y);

            // Look for hovered tower
            let tower = this.get(x, y, this.towermap);
            if(tower !== undefined) {
                tower.onHover();
            }
        } else {
            // Selector is not visible if the pointer is over a menu
            this.selector.visible = false;
        }

        // Update enemies
        this.enemies.filter(e => e.sprite.health <= 0.0).forEach(e => {
            // Show price
            let overlay = new UIOverlay(e.sprite.body.x + e.sprite.width/2 , e.sprite.body.y + e.sprite.height/2, "+" + e.points, this.game);
            tinydefence.game.ui.addOverlay(overlay.start());

            e.die();
            this.model.money += e.points;
        });

        this.enemies = this.enemies.filter(e => e.sprite.health > 0.0 && e.targetReached === false);
        this.enemies.forEach(e => e.update());
    }

    checkInput(x, y) {
        if((this.game.input.pointer1.isDown || this.game.input.mousePointer.isDown) && !tinydefence.game.ui.isCursorOverMenu()) {
            this.wasButtonDown = true;
        } else {
            if(this.wasButtonDown) {
                this.onClick(x, y);
                this.wasButtonDown = false;
            }
        }
    }

    onClick(x, y) {
        
        if(!tinydefence.game.ui.buildmenu.isOpen && (this.isFieldFree(x, y) || this.isTower(x, y))) {
            // open build menu for free fields
            let tile = this.get(x, y, this.map);
            let tower = this.get(x, y, this.towermap);
            tinydefence.game.ui.buildmenu.openMenu(
                (x * this.twidth) + (this.twidth/2), 
                (y * this.theight), 
                tile, tower);

        } else {
            tinydefence.game.ui.buildmenu.closeMenu();
        }
    }

    drawSelector(x, y) {
        if(this.isFieldFree(x, y) || this.isTower(x, y)) {
            this.selector.visible = true;
            this.selector.body.x = x*this.twidth;
            this.selector.body.y = y*this.theight;
        }
         else {
            this.selector.visible = false;
        }
    }

    isTower(x, y) {
        let tower = this.get(x, y, this.towermap);
        return tower !== undefined;
    }

    isFieldFree(x, y) {
        let tile = this.get(y, x, this.waypointData);
        let tower = this.get(x, y, this.towermap);
        return !(tile !== 0 || tower !== undefined);
    }

    getTile(x, y, map) {
        return this.get(y, x, map);
    }

    get(x, y, map) {
        return map[x*this.width + y];
    }

    set(value, x, y, map) {
        map[x*this.width + y] = value;
    }

    getCursor() {
        return(this.screenToTileCoords(this.game.input.x, this.game.input.y));
    }

    screenToTileCoords(xscreen, yscreen) {
        let x = Math.floor((xscreen * this.game.scale.parentScaleFactor.x) / (this.twidth));
        let y = Math.floor((yscreen * this.game.scale.parentScaleFactor.y) / (this.theight)); 
        // Contraints
        x = x >= this.width || x < 0 ? null : x; 
        y = y >= this.height || y < 0 ? null : y; 

        return {x: x, y: y};
    }

    initBuildmenuButtons() {

        tinydefence.game.ui.buildmenu.onBuildTower((towerType, x, y) => {

            let coords = this.screenToTileCoords(x, y);

            let tower = new Tower(this.game, 
                coords.x * this.twidth, 
                coords.y * this.twidth, 
                tinydefence.towerManager.getTowerType('Cannon'));
            
            if(this.model.money >= tower.getPrice(tower.tier)) {
                console.log("Buy new tower");
                tower.build();
                this.addTower(tower, coords.x, coords.y);
                this.model.money -= tower.getPrice(tower.tier);
            } else {
                console.log("Not enougth money");
                tower = {};
            }
        });
        
        tinydefence.game.ui.buildmenu.onUpgradeTower((tower, x, y) => {

            if(this.model.money >= tower.getPrice(tower.tier + 1) && tower.tier < tower.maxTier) {
                console.log("Buy tower upgrade");
                tower.upgrade();
                this.model.money -= tower.getPrice(tower.tier);
            } else {
                console.log("Not enougth money");
            }

        });

        tinydefence.game.ui.buildmenu.onSellTower((tower, x, y) => {
            
            let coords = this.screenToTileCoords(x, y);
            this.removeTower(tower, coords.x, coords.y);

            let salePrice = tower.getWorth();
            this.model.money += salePrice;

            let overlay = new UIOverlay(x, y, "+"+salePrice, this.game, 32);
            tinydefence.game.ui.addOverlay(overlay.start());
        });

        tinydefence.game.ui.buildmenu.onHoverBuildTower(
            // On hover
            (towerType) => {
                let tower =  tinydefence.towerManager.getTowerType(towerType);
                let price = tower.tiers[0].attributes.price;
                tinydefence.game.ui.setPrice(price,
                    Number.isInteger(price) && price <= this.model.money ? 'green' : 'red');
            }, 
            // On out
            () => {
                tinydefence.game.ui.setPrice(null);
            }
        );
            
        tinydefence.game.ui.buildmenu.onHoverUpgradeTower(
            // On hover
            (tower) => {
                if(tower.tier + 1 <= tower.maxTier) {
                    let price = tower.type.tiers[tower.tier + 1].attributes.price;
                    tinydefence.game.ui.setPrice(price,
                        Number.isInteger(price) && price <= this.model.money ? 'green' : 'red');
                }
                else
                {
                	tinydefence.game.ui.setPrice('max', 'red');
                }
            }, 
            // On out
            () => {
                tinydefence.game.ui.setPrice(null);
            }
        );
            
        tinydefence.game.ui.buildmenu.onHoverSellTower(
            // On hover
            (tower) => {
                tinydefence.game.ui.setPrice("+" + tower.getWorth());
            }, 
            // On out
            () => {
                tinydefence.game.ui.setPrice(null);
            }
        );

    }
}
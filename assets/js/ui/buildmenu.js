class Buildmenu {

    constructor() {
        
        this.buildTowerCallback = null;
        this.upgradeTowerCallback = null;
        this.sellTowerCallback = null;

        this.hoverBuildTowerCallback = null;
        this.hoverOutBuildTowerCallback = null;
        
        this.hoverUpgradeTowerCallback = null;
        this.hoverOutUpgradeTowerCallback = null;
        
        this.hoverSellTowerCallback = null;
        this.hoverOutSellTowerCallback = null;

        this.isOpen = false;
        this.menu;
    }
    
    renderMenu(width) {
                
        let bmd = tinydefence.game.add.bitmapData(width + 4, 28);
        let sprite = tinydefence.game.add.sprite(0, 0, 'buildmenu');
        
        // left
        bmd.copyRect(sprite, new Phaser.Rectangle(0, 0, 2, 22), 0, 6);
        
        // mid
        for(let i=0; i<width; i++) {
            bmd.copyRect(sprite, new Phaser.Rectangle(2, 0, 1, 22), 2 + i, 6);
        }
        
        // right
        bmd.copyRect(sprite, new Phaser.Rectangle(3, 0, 2, 22), width+1, 6);
        
        // top edge
        bmd.copyRect(sprite, new Phaser.Rectangle(5, 0, 11, 7), (width+4)/2 - 5, 0);

        sprite.destroy();

        return tinydefence.game.add.image(0, 0, bmd);
    }

    showMenu(x, y, items) {

        let width = (items.length * tinydefence.constants.TILE_WIDTH) + ((items.length-1) * 2);
        this.menu = this.renderMenu(width);
        this.menu.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);
        this.menu.anchor.x = 0.5;
        this.menu.x = x;
        this.menu.y = y + (tinydefence.constants.TILE_HEIGHT*tinydefence.scalefactor);
        this.menu.items = items;

        let xBegin = this.menu.x - this.menu.width/2;
        let yBegin = this.menu.y - this.menu.height/2;
        let space = 2;

        for(let i=0; i<items.length; i++) {
            items[i].x = xBegin + 4 + (i * (16*tinydefence.scalefactor));
            items[i].x = i > 0 ? items[i].x + space : items[i].x;
             
            items[i].y = this.menu.y + tinydefence.constants.TILE_HEIGHT;
            items[i].visible = true;
            items[i].alpha = 1;
            tinydefence.game.world.bringToTop(items[i]);
        }

        tinydefence.game.add.tween(this.menu)
            .from({alpha: 0, y: this.menu.y - 15}, 200, Phaser.Easing.Cubic.Out, true);

        this.menu.items.forEach(item => {
            tinydefence.game.add.tween(item)
                .from({alpha: 0, y: this.menu.y - 15}, 200, Phaser.Easing.Cubic.Out, true);
        });
    }

    openMenu(x, y, tile, tower) {
        // show menu for building towers
        if(tower === undefined) {
            // render menu
            let items = [this.buildButton];
            this.showMenu(x, y, items);
            this.menu.params = {x:x, y:y, tile:tile, tower:'Cannon'};
        }
        // show menu for upgrading or selling towers 
        else {
            // provide towers depending on tile
            let items = [];
            // Show upgrade button if its possible
            if(tower.tier < tower.maxTier) {
                items.push(this.upgradeButton);
            }
            // Show sell button
            items.push(this.sellButton);

            this.showMenu(x, y, items);
            this.menu.params = {x:x, y:y, tile:tile, tower:tower};
        }
        
        this.isOpen = true;
    }
    
    closeMenu() {
        if(this.menu !== undefined) {
            let tween = tinydefence.game.add.tween(this.menu)
                .to({alpha: 0, y: this.menu.y - 15}, 200, Phaser.Easing.Cubic.Out, true);
                
            this.menu.items.forEach(item => {
                    tinydefence.game.add.tween(item)
                        .to({alpha: 0, y: this.menu.y - 15}, 200, Phaser.Easing.Cubic.Out, true);
            });
            
            tween.onComplete.add(() => {
                this.menu.items.forEach(item => item.visible = false);
                this.menu.destroy();
                this.isOpen = false;
            }, this);
        }
    }

    /** args: (towerType, x, y) */
    onBuildTower(callback) {
        this.buildTowerCallback = callback;

        let key = tinydefence.towerManager.getTowerType('Cannon').tiers[0].spritesheet_tower;

        this.buildButton = tinydefence.game.add.button(0, 0, key, () => {
            let params = this.menu.params;
            this.buildTowerCallback(params.tower, params.x, params.y);
        }, this, 0, 0, 0);

        this.buildButton.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);
        this.buildButton.visible = false;
        this.buildButton.onInputOver.add(() => {
            if(this.hoverBuildTowerCallback !== null) {
                this.hoverBuildTowerCallback(this.menu.params.tower);
            }
        }, this);

        this.buildButton.onInputOut.add(() => {
            if(this.hoverOutBuildTowerCallback !== null) {
                this.hoverOutBuildTowerCallback();
            }
        }, this);
    }
    
    /** args: (tower, x, y) */
    onUpgradeTower(callback) {
        this.upgradeTowerCallback = callback;
        this.upgradeButton = tinydefence.game.add.button(0, 0, 'buildmenuButtons', () => {
            let params = this.menu.params;
            this.upgradeTowerCallback(params.tower, params.x, params.y);
        }, this, 1, 1, 1);

        this.upgradeButton.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);
        this.upgradeButton.visible = false;
        this.upgradeButton.onInputOver.add(() => {
            if(this.hoverUpgradeTowerCallback !== null) {
                this.hoverUpgradeTowerCallback(this.menu.params.tower);
            }
        }, this);

        this.upgradeButton.onInputOut.add(() => {
            if(this.hoverOutUpgradeTowerCallback !== null) {
                this.hoverOutUpgradeTowerCallback();
            }
        }, this);
    }
    
    /** args: (tower) */
    onSellTower(callback) {
        this.sellTowerCallback = callback;
        this.sellButton = tinydefence.game.add.button(0, 0, 'buildmenuButtons', () => {
            let params = this.menu.params;
            this.sellTowerCallback(params.tower, params.x, params.y);
        }, this, 2, 2, 2);

        this.sellButton.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);
        this.sellButton.visible = false;
        this.sellButton.onInputOver.add(() => {
            if(this.hoverSellTowerCallback !== null) {
                this.hoverSellTowerCallback(this.menu.params.tower);
            }
        }, this);

        this.sellButton.onInputOut.add(() => {
            if(this.hoverOutSellTowerCallback !== null) {
                this.hoverOutSellTowerCallback();
            }
        }, this);
    }

    onHoverBuildTower(overCallback, outCallback) {
        this.hoverBuildTowerCallback = overCallback;
        this.hoverOutBuildTowerCallback = outCallback;
    }

    onHoverUpgradeTower(overCallback, outCallback) {
        this.hoverUpgradeTowerCallback = overCallback;
        this.hoverOutUpgradeTowerCallback = outCallback;
    }
    
    onHoverSellTower(overCallback, outCallback) {
        this.hoverSellTowerCallback = overCallback;
        this.hoverOutSellTowerCallback = outCallback;
    }

}
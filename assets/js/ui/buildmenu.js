class Buildmenu {

    constructor() {
        
        this.buildTowerCallback = null;
        this.upgradeTowerCallback = null;
        this.sellTowerCallback = null;
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

        let width = (items.length * 16) + (items.length * 2);
        this.menu = this.renderMenu(width);
        this.menu.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);
        this.menu.anchor.x = 0.5;
        this.menu.x = x;
        this.menu.y = y;
        this.menu.items = items;

        let xBegin = this.menu.x - this.menu.width/2;
        let yBegin = this.menu.y - this.menu.height/2;
        let space = 2;

        for(let i=0; i<items.length; i++) {
            items[i].x = xBegin + 4 + (i * (16*tinydefence.scalefactor));
            items[i].x = i > 0 ? items[i].x + space : items[i].x;
             
            items[i].y = this.menu.y + 16;
            items[i].visible = true;
            tinydefence.game.world.bringToTop(items[i]);
        }

        tinydefence.game.add.tween(this.menu)
            .from({alpha: 0, y: this.menu.y - 15}, 200, Phaser.Easing.Cubic.Out, true);
    }

    openMenu(x, y, tile, tower) {
        // show menu for building towers
        if(tower === undefined) {
            // render menu
            let items = [this.buildButton];
            this.showMenu(x, y, items);
            this.menu.params = {x:x, y:y, tile:tile, tower:0};
        }
        // show menu for upgrading or selling towers 
        else {
            // provide towers depending on tile
            let items = [this.upgradeButton, this.sellButton];
            this.showMenu(x, y, items);
            this.menu.params = {x:x, y:y, tile:tile, tower:tower};
        }
        
        this.menu.params = {x:x, y:y, tile:tile, tower:0};
        this.isOpen = true;
    }
    
    closeMenu() {
        let tween = tinydefence.game.add.tween(this.menu)
            .to({alpha: 0, y: this.menu.y - 15}, 200, Phaser.Easing.Cubic.Out, true);
        
        tween.onComplete.add(() => {
            this.menu.items.forEach(item => item.visible = false);
            this.menu.destroy();
            this.isOpen = false;
        }, this);
    }

    /** args: (towerType, x, y) */
    onBuildTower(callback) {
        this.buildTowerCallback = callback;
        this.buildButton = tinydefence.game.add.button(0, 0, 'Cannon', () => {
            let params = this.menu.params;
            this.buildTowerCallback(0, params.x, params.y);
        }, this, 0, 0, 0);
        this.buildButton.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);
        this.buildButton.visible = false;
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
    }

}
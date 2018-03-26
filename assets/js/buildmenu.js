class Buildmenu {

    constructor() {
        
        this.buildTowerCallback = null;
        this.upgradeTowerCallback = null;
        this.sellTowerCallback = null;
        this.isOpen = false;
        this.menu;
    }
    
    renderMenu(items) {
        
        let width = 100;
        
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

    openMenu(x, y, tile, tower) {
        // show menu for building towers
        if(tower === undefined) {
            // render menu
            this.menu = this.renderMenu(['T1', 'T2', 'Sell']);
            this.menu.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);
            this.menu.anchor.x = 0.5;
            this.menu.x = x;
            this.menu.y = y;

            tinydefence.game.add.tween(this.menu)
                .from({alpha: 0, y: this.menu.y - 15}, 200, Phaser.Easing.Cubic.Out, true);
        }
        // show menu for upgrading or selling towers 
        else {
            // provide towers depending on tile

        }

        this.isOpen = true;
        console.log("menu is open at " + x + ", " + y + " on " + tile + " with " + tower);
    }
    
    closeMenu() {
        let tween = tinydefence.game.add.tween(this.menu)
            .to({alpha: 0, y: this.menu.y - 15}, 200, Phaser.Easing.Cubic.Out, true);

        tween.onComplete.add(() => {
            this.menu.destroy()
            this.isOpen = false;
        }, this);
    }

    /** args: (tower, x, y) */
    onBuildTower(callback) {
        this.buildTowerCallback = callback;
    }
    
    /** args: (tower, x, y) */
    onUpgradeTower(callback) {
        this.upgradeTowerCallback = callback;
    }

    /** args: (tower) */
    onSellTower(callback) {
       this.sellTowerCallback = callback;
    }

}
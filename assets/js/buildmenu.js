class Buildmenu {

    constructor() {
        
        this.buildTowerCallback = null;
        this.upgradeTowerCallback = null;
        this.sellTowerCallback = null;
        this.isOpen = false;

        this.graphics = tinydefence.game.add.graphics(0, 0);
        this.menu;
    }

    renderMenu(items) {

        let width = 100;
        // For testing
        this.graphics.clear();
        this.graphics.beginFill(0x000000, 1);
        this.graphics.drawRect(0, 10, width, 22);
        this.graphics.endFill();
        this.graphics.beginFill(0xFFFFFF, 1);
        this.graphics.drawRect(0, 10, width, 20);
        this.graphics.endFill();
        
        this.graphics.beginFill(0xFFFFFF, 1);
        this.graphics.moveTo(width/2 - 10, 10);
        this.graphics.lineTo(width/2, 0);
        this.graphics.lineTo(width/2 + 10, 10);
        this.graphics.endFill();

        items.forEach(i => {
        });

        return tinydefence.game.add.image(0, 0, this.graphics.generateTexture());
    }

    openMenu(x, y, tile, tower) {
        // show menu for building towers
        if(tower === undefined) {
            // render menu
            this.menu = this.renderMenu(['T1', 'T2', 'Sell']);
            this.menu.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);
            this.menu.anchor.x = 0.5;
            this.menu.x = x;
            this.menu.y = y + 10;
        }
        // show menu for upgrading or selling towers 
        else {
            // provide towers depending on tile

        }

        this.isOpen = true;
        console.log("menu is open at " + x + ", " + y + " on " + tile + " with " + tower);
    }
    
    closeMenu() {
        this.menu.destroy();
        this.isOpen = false;
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
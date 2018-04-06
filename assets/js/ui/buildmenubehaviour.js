
class BuildMenuBehaviour {

    constructor(defencegame) {

        this.defencegame = defencegame;

        tinydefence.game.ui.buildmenu.onBuildTower((towerType, x, y) => {

            let coords = this.defencegame.screenToTileCoords(x, y);

            let tower = new Tower(this.defencegame.game, 
                coords.x * this.defencegame.twidth, 
                coords.y * this.defencegame.twidth, 
                tinydefence.towerManager.getTowerType('Cannon'));
            
            if(this.defencegame.model.money >= tower.getPrice(tower.tier)) {
                console.log("Buy new tower");
                tower.build();
                this.defencegame.addTower(tower, coords.x, coords.y);
                this.defencegame.model.money -= tower.getPrice(tower.tier);
            } else {
                console.log("Not enougth money");
                tower = {};
            }
        });
        
        tinydefence.game.ui.buildmenu.onUpgradeTower((tower, x, y) => {

            if(this.defencegame.model.money >= tower.getPrice(tower.tier + 1) && tower.tier < tower.maxTier) {
                console.log("Buy tower upgrade");
                tower.upgrade();
                this.defencegame.model.money -= tower.getPrice(tower.tier);
            } else {
                console.log("Not enougth money");
            }

        });

        tinydefence.game.ui.buildmenu.onSellTower((tower, x, y) => {
            
            let coords = this.screenToTileCoords(x, y);
            this.defencegame.removeTower(tower, coords.x, coords.y);

            let salePrice = tower.getWorth();
            this.defencegame.model.money += salePrice;

            let overlay = new UIOverlay(x, y, "+"+salePrice, this.defencegame.game, 32);
            tinydefence.game.ui.addOverlay(overlay.start());
        });

        tinydefence.game.ui.buildmenu.onHoverBuildTower(
            // On hover
            (towerType) => {
                let tower =  tinydefence.towerManager.getTowerType(towerType);
                let price = tower.tiers[0].attributes.price;
                tinydefence.game.ui.setPrice(price,
                    Number.isInteger(price) && price <= this.defencegame.model.money ? 'green' : 'red');
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
                        Number.isInteger(price) && price <= this.defencegame.model.money ? 'green' : 'red');
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
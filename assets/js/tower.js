class Tower {

    constructor(game, x, y) {
        
        this.tier = 1;
        this.maxTier = 3;
        this.radius = 50;
        this.strength = 2.0;
        this.startPrice = 50;
        this.upgradePriceFactor = 0.5;
        this.attackPause = 1000;
        this.bulletSpeed = 500;
        this.lastAttack = 0;

        this.attacks = [];

        this.focusedEnemy= undefined;

        this.x = x;
        this.y = y;
        this.game = game;
    }

    searchForEnemy(enemies) {
        let enemiesInRange = enemies.filter(e => e.sprite.body !== null && this.isInRange(e.sprite.body.x, e.sprite.body.y, e.sprite.body.width));
        if(enemiesInRange.length > 0) {
            this.focusedEnemy = enemiesInRange[0];
        }
    }
        
    update() {
        // Remove hover effect
        this.graphics.clear();
        this.statsText.setText("");
        // this.game.upgradePriceText.setText("");

        // Enemy still in range?
        if(this.focusedEnemy !== undefined) {

            if(this.focusedEnemy.sprite.health > 0.0) {
                let body = this.focusedEnemy.sprite.body;
                if(body !== null && this.isInRange(body.x, body.y, body.width)) {
                    if(this.game.time.now > this.lastAttack + this.attackPause) {
                        this.attack();
                        this.lastAttack = this.game.time.now;
                    }
                } else {
                    this.focusedEnemy = undefined;
                }
            } else {
                this.focusedEnemy = undefined;
            }
        } 

        // Remove attacks on dead enemies
        this.attacks.filter(a => a.enemy.sprite.health <= 0.0).forEach(a => a.bullet.kill());
        this.attacks = this.attacks.filter(a => a.enemy.sprite.health > 0.0);

        // Update attacks
        this.attacks.forEach(a => {
            // Move bullet to focused enemy
            this.game.physics.arcade.moveToObject(a.bullet, a.enemy.sprite, this.bulletSpeed);
    
            // Check collision
            this.game.physics.arcade.collide(
                this.bullets,
                a.enemy.sprite,
                this.onHit);
        });
    }

    onHover() {
        // Radius
        this.graphics.lineStyle(1, 0xBD5A08, 1);
        this.graphics.drawCircle(
            this.sprite.body.x + this.sprite.width/2, 
            this.sprite.body.y + this.sprite.height/2, 
            this.radius * 2);

        // Stats with 1 decimal digit
        this.statsText.setText("Canon L." + this.tier
            + "\nDamage: " + Math.round(this.strength * 10) / 10
            + "\nRadius: " + Math.round(this.radius / 16 * 10) / 10 // calculate radius in tiles
            + "\nReload: " + Math.round(this.attackPause / 100) / 10);

        // Price for upgrade
        tinydefence.game.ui.setPrice(this.tier < this.maxTier ? this.getPrice(this.tier + 1) : 'maxed');
    }

    attack() {
        let bullet = this.bullets.getFirstExists(false);
        bullet.reset(this.sprite.x + this.sprite.width/2, this.sprite.y + this.sprite.height/2);
        bullet.strength = this.strength;

        this.sprite.animations.play('shoot');

        this.attacks.push({
            enemy: this.focusedEnemy, 
            bullet: bullet,
            bulletspeed: 300,
        });
    }

    onHit(enemy, bullet) {
        enemy.health -= bullet.strength; 
        bullet.kill();
    }

    isInRange(x, y, width) {
        let dx = (x - this.sprite.x) * (x - this.sprite.x)
        let dy = (y - this.sprite.y) * (y - this.sprite.y)
        return Math.sqrt(dx + dy) < this.radius + width / 2;
    }

    build() {
        this.sprite = this.game.add.sprite(this.x, this.y, 'tower');
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        
        this.animation = this.sprite.animations.add('idle', [2], 4, true);
        this.sprite.animations.play('idle');
        
        this.shootAnimation = this.sprite.animations.add('shoot', [1, 0, 1], 12, false);
        this.shootAnimation.onComplete.add(sprite => sprite.animations.play('idle'));
        
        this.bullets = this.game.add.group();
        this.bullets.createMultiple(50, 'bullet');
        this.game.physics.enable(this.bullets, Phaser.Physics.ARCADE);
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        this.bullets.setAll('outOfBoundsKill', true);

        // Hover info
        this.graphics = this.game.add.graphics(0, 0);
        this.statsText = this.game.add.bitmapText(
            this.sprite.body.x + this.sprite.width, 
            this.sprite.body.y + this.sprite.height,
            'font1', 
            "",
            16);
    }

    upgrade() {
        console.log("upgrading tower");
        this.tier ++;
        this.radius += this.radius * 0.1;
        this.strength += this.strength * 0.95;
        this.attackPause -= this.attackPause * 0.15;
    }

    getPrice(tier) {
        return this.startPrice + Math.round((tier - 1) * this.upgradePriceFactor * this.startPrice);
    }

}
  
class Tower {

    constructor(game, x, y, type) {
        
        this.game = game;
        this.x = x;
        this.y = y;
        this.type = type;
        this.tier = 0;
        
        // TODO get tower by type key instead of index
        this.color = this.type.color;
        this.maxTier = this.type.tiers.length - 1;
        this.init();

        this.lastAttack = 0;
        this.attacks = [];

        this.focusedEnemy= undefined;
    }

    init()
    {
        // TODO get tower by type key instead of index
        this.attr = this.type.tiers[this.tier].attributes;
        this.towerSprite = this.type.tiers[this.tier].spritesheet_tower;
        this.shotSprite = this.type.tiers[this.tier].spritesheet_shot;
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
                    if(this.game.time.now > this.lastAttack + this.attr.fire_rate) {
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
            this.game.physics.arcade.moveToObject(a.bullet, a.enemy.sprite, this.attr.bullet_speed);
    
            // Check collision
            this.game.physics.arcade.collide(
                this.bullets,
                a.enemy.sprite,
                this.onHit);
        });

        if (tinydefence.game.ui.showCompleteCoverage) {
            this.drawRange();
        }
    }

    drawRange() {
        // Radius
        this.graphics.lineStyle(2, this.color, 1);
        this.graphics.drawCircle(
            this.sprite.body.x + this.sprite.width/2,
            this.sprite.body.y + this.sprite.height/2,
            this.attr.range * tinydefence.scalefactor * 2 * 16);
    }

    onHover() {
        this.drawRange();

        // Stats with 1 decimal digit
        this.statsText.setText("Cannon L." + (this.tier + 1)
            + "\nDamage: " + Math.round(this.attr.damage * 10) / 10
            + "\nRange: " + Math.round(this.attr.range * 10) / 10
            + "\nReload: " + Math.round(this.attr.fire_rate / 100) / 10);
    }

    attack() {
        let bullet = this.bullets.getFirstExists(false);
        bullet.reset(this.sprite.x + this.sprite.width/2, this.sprite.y + this.sprite.height/2);
        bullet.damage = this.attr.damage;

        this.sprite.animations.play('shoot');

        this.attacks.push({
            enemy: this.focusedEnemy, 
            bullet: bullet
        });
    }

    onHit(enemy, bullet) {
        enemy.health -= bullet.damage; 
        bullet.kill();
    }

    isInRange(x, y, width) {
        let dx = (x - this.sprite.x) * (x - this.sprite.x)
        let dy = (y - this.sprite.y) * (y - this.sprite.y)
        return Math.sqrt(dx + dy) < this.attr.range * tinydefence.scalefactor * 16 + width / 2;
    }

    build() {
        this.sprite = this.game.add.sprite(this.x, this.y, this.towerSprite);
        this.sprite.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        
        this.animation = this.sprite.animations.add('idle', [2], 4, true);
        this.sprite.animations.play('idle');
        
        this.shootAnimation = this.sprite.animations.add('shoot', [1, 0, 1], 12, false);
        this.shootAnimation.onComplete.add(sprite => sprite.animations.play('idle'));
        
        this.bullets = this.game.add.group();
        this.bullets.createMultiple(50, this.shotSprite);
        this.game.physics.enable(this.bullets, Phaser.Physics.ARCADE);
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        this.bullets.setAll('scale.x', tinydefence.scalefactor);
        this.bullets.setAll('scale.y', tinydefence.scalefactor);
        this.bullets.setAll('outOfBoundsKill', true);

        // Hover info
        this.graphics = this.game.add.graphics(0, 0);
        this.statsText = this.game.add.bitmapText(
            this.sprite.body.x + this.sprite.width, 
            this.sprite.body.y + this.sprite.height,
            'font_white', 
            "",
            16);
    }

    upgrade() {
        console.log("Upgrading tower to level " + (this.tier + 2));
        this.tier ++;
        this.init();
    }

    getPrice(tier) {
        // TODO get tower by type key instead of index
        return this.type.tiers[tier].attributes.price;
    }
}
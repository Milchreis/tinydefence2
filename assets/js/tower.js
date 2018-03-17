class Tower {

    constructor(game, x, y) {
        
        this.tier = 1;
        this.maxTier = 3;
        this.radius = 200;
        this.strange = 2.0;
        this.price = 50;
        this.attackPause = 1000;
        this.bulletSpeed = 500;
        this.lastAttack = 0;

        this.attacks = [];

        this.focusedEnemy= undefined;

        this.game = game;
        
        this.sprite = game.add.sprite(x, y, 'tower');
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);
        
        this.animation = this.sprite.animations.add('idle', [2], 4, true);
        this.sprite.animations.play('idle');
        
        this.shootAnimation = this.sprite.animations.add('shoot', [1, 0, 1], 12, false);
        this.shootAnimation.onComplete.add(sprite => sprite.animations.play('idle'));
        
        this.bullets = this.game.add.group();
        this.bullets.createMultiple(50, 'bullet');
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
            'font1', 
            "",
            16);
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
        this.graphics.lineStyle(2, 0xBD5A08, 1);
        this.graphics.drawCircle(
            this.sprite.body.x + this.sprite.width/2, 
            this.sprite.body.y + this.sprite.height/2, 
            this.radius);
        this.statsText.setText("Canon L." + this.tier
            + "\nDamage: " + this.strange
            + "\nRadius: " + this.radius
            + "\nReload: " + this.attackPause
            + "\nSpeed: " + this.bulletSpeed);
    }

    attack() {
        let bullet = this.bullets.getFirstExists(false);
        bullet.reset(this.sprite.x + this.sprite.width/2, this.sprite.y + this.sprite.height/2);
        bullet.strange = this.strange;

        this.sprite.animations.play('shoot');

        this.attacks.push({
            enemy: this.focusedEnemy, 
            bullet: bullet,
            bulletspeed: 300,
        });
    }

    onHit(enemy, bullet) {
        enemy.health -= bullet.strange; 
        bullet.kill();
    }

    isInRange(x, y, width) {
        let dx = (x - this.sprite.x) * (x - this.sprite.x)
        let dy = (y - this.sprite.y) * (y - this.sprite.y)
        return Math.sqrt(dx + dy) < this.radius/2 + width/2;
    }

    upgrade() {
        console.log("upgrading tower");
        this.tier ++;
        this.radius += Math.round(this.radius * 0.1);
        this.strange += this.strange * 0.8;
        this.price += Math.round(this.price * 0.5);
        this.attackPause -= Math.round(this.attackPause * 0.2);
    }

}
  
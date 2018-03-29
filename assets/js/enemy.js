
class Enemy {

    constructor(game, waypoints, type) {
        
		this.maxhealth = 10.0;
        this.points = 0.5;
        this.speed = 10;
        this.targetReached = false;

        this.waypoints = waypoints;
        this.waypointIndex = 0;
        this.nextWaypoint = this.waypoints[this.waypointIndex+1];

        this.dirX = this.nextWaypoint[0] - this.waypoints[0][0];
        this.dirY = this.nextWaypoint[1] - this.waypoints[0][1];

        this.game = game;
        this.type = type;

        this.sprite = game.add.sprite(this.waypoints[0][0], this.waypoints[0][1], type);
        this.animationManager = this.sprite.animations

        if(type === 'crab') {
            this.animationManager.add('walkLeft', [4, 5, 6, 7], 8, true);
            this.animationManager.add('walkRight', [0, 1, 2, 3], 8, true);
            this.animationManager.add('walkUp', [12, 13, 14, 15], 8, true);
            this.animationManager.add('walkDown', [8, 9, 10, 11], 8, true);
        } else {
            this.animationManager.add('walkLeft', [0, 1, 2, 3], 8, true);
            this.animationManager.add('walkRight', [0, 1, 2, 3], 8, true);
            this.animationManager.add('walkUp', [0, 1, 2, 3], 8, true);
            this.animationManager.add('walkDown', [0, 1, 2, 3], 8, true);
        }

        //this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.setSize(32, 32, 0, 0);

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        //this.sprite.body.immovable = true;
        this.sprite.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);

        this.sprite.health = this.maxhealth;
        //this.sprite.animations.play('idle');

        this.graphics = this.game.add.graphics(0, 0);
        this.velocityOld = {}
    }

    update() {
        this.graphics.clear();
        
        console.log(this.game.physics.arcade.collide(this.sprite, tinydefence.mapTest.tilemapLayers.collision));

        if(!this.sprite.visible)
        return;

        if(this.sprite.health <= 0.0) {
            this.die();
            return;
        }

        let x = Math.floor(this.sprite.body.x);
        let y = Math.floor(this.sprite.body.y);

        this.sprite.body.velocity.x = this.speed
        this.sprite.body.velocity.y = this.speed

        // let deltaX = this.nextWaypoint[0] - x;
        // let deltaY = this.nextWaypoint[1] - y;

        // if(deltaX == 0) {
        //     this.sprite.body.velocity.x = 0
        // } else if (deltaX > 0) {
        //     this.sprite.body.velocity.x = this.speed
        // } else if(deltaX < 0) {
        //     this.sprite.body.velocity.x = -this.speed
        // };

        // if(deltaY == 0) {
        //     this.sprite.body.velocity.y = 0
        // } else if(deltaY > 0) {
        //     this.sprite.body.velocity.y = this.speed
        // } else if(deltaY < 0) {
        //      this.sprite.body.velocity.y = -this.speed
        // };

        // if(this.dirX > 0 && deltaX <= 0) {
        //     this.sprite.body.velocity.x = 0;
        //     this.sprite.body.x = this.nextWaypoint[0]
        // }

        // if(this.dirX < 0 && deltaX >= 0) {
        //     this.sprite.body.velocity.x = 0;
        //     this.sprite.body.x = this.nextWaypoint[0]
        // }

        //  if(this.dirY > 0 && deltaY <= 0) {
        //     this.sprite.body.velocity.y = 0;
        //     this.sprite.body.y = this.nextWaypoint[1]
        // }

        // if(this.dirY < 0 && deltaY >= 0) {
        //     this.sprite.body.velocity.y = 0;
        //     this.sprite.body.y = this.nextWaypoint[1]
        // }

        // // Next waypoint reached?
        // if(x == this.nextWaypoint[0] && y == this.nextWaypoint[1]) {
        //     //this.sprite.body.x = this.nextWaypoint[0]
        //     //this.sprite.body.y = this.nextWaypoint[1]

        //     this.waypointIndex += 1;
        //     // last waypoint reached?
        //     if(this.waypointIndex >= this.waypoints.length) {
        //         this.die();
        //         this.targetReached = true;
        //         if(typeof this.onTargetReachedCallback === 'function') {
        //             this.onTargetReachedCallback();
        //         }
        //     } else {
        //         this.nextWaypoint = this.waypoints[this.waypointIndex];
        //     }

        //     this.dirX = this.nextWaypoint[0] - x;
        //     this.dirY = this.nextWaypoint[1] - y;

        //     if(Math.abs(this.dirX) > Math.abs(this.dirY)) {
        //         if(this.dirX >= 0) {
        //             this.animationManager.play('walkRight');
        //         } else {
        //             this.animationManager.play('walkLeft');
        //         }
        //     } else {
        //         if(this.dirY >= 0) {
        //             this.animationManager.play('walkDown');
        //         } else {
        //             this.animationManager.play('walkUp');
        //         }
        //     }

        // }

        // Draw health bar
        if(this.sprite.health > 0 && this.sprite.body !== null) {
            let healthRatio = this.sprite.health / this.maxhealth;
            this.graphics.lineStyle(0);
            this.graphics.beginFill(0xFF0000, 1);
            this.graphics.drawRect(this.sprite.body.x + 2, this.sprite.body.y + this.sprite.height, this.sprite.width - 5, 1);
            this.graphics.beginFill(0x00FF00, 1);
            this.graphics.drawRect(this.sprite.body.x + 2, this.sprite.body.y + this.sprite.height, (this.sprite.width - 5) * healthRatio, 1);
            this.graphics.endFill();
        }
    }
    
    onTargetReached(callback) {
        this.onTargetReachedCallback = callback;
    }

    die() {
        this.graphics.clear();
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.sprite.visible = false;
        this.sprite.destroy();
    }

    isIn(value, start, end) {
        return value >= start && value <= end;
    }

    inRange(value, value2, offset) {
       return this.isIn(value, value2 - offset, value2 + offset);
    }
}
  
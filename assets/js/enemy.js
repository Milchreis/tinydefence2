
class Enemy {

    constructor(game, waypoints, type) {
        
		this.maxhealth = 10.0;
        this.points = 0.5;
        this.speed = 10;
        this.targetReached = false;

        this.waypoints = waypoints;
        this.waypointIndex = 0;
        this.nextWaypoint = this.waypoints[this.waypointIndex+1];

        this.game = game;
        this.type = type;

        if(type === 'crab') {
            this.sprite = game.add.sprite(this.waypoints[0][0], this.waypoints[0][1], 'crab');
            this.animation = this.sprite.animations.add('idle', [0, 1, 2, 3], 8, true);
        } else {
            this.sprite = game.add.sprite(this.waypoints[0][0], this.waypoints[0][1], 'enemy');
            this.animation = this.sprite.animations.add('idle', [0, 1, 2, 3], 8, true);
        }
        
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.body.immovable = true;

        this.sprite.health = this.maxhealth;
        this.sprite.animations.play('idle');

        this.graphics = this.game.add.graphics(0, 0);
    }
    
    update() {
        this.graphics.clear();

        if(!this.sprite.visible)
        return;

        if(this.sprite.health <= 0.0) {
            this.die();
            return;
        }

        let x = Math.floor(this.sprite.body.x);
        let y = Math.floor(this.sprite.body.y);

        // Next waypoint reached?
        if(this.inRange(x, this.nextWaypoint[0], 3) && this.inRange(y, this.nextWaypoint[1], 3)) {
            this.waypointIndex += 1;
            // last waypoint reached?
            if(this.waypointIndex >= this.waypoints.length) {
                this.die();
                this.targetReached = true;
                if(typeof this.onTargetReachedCallback === 'function') {
                    this.onTargetReachedCallback();
                }
            } else {
                this.nextWaypoint = this.waypoints[this.waypointIndex];
            }

        } else {
            // Move to waypoint
            if(x < this.nextWaypoint[0]) {
                this.sprite.body.velocity.x = this.speed;
            } else if(x > this.nextWaypoint[0]) {
                this.sprite.body.velocity.x = -this.speed;
            } else {
                this.sprite.body.velocity.x = 0;
            }

            if(y < this.nextWaypoint[1]) {
                this.sprite.body.velocity.y = this.speed;
            } else if(y > this.nextWaypoint[1]) {
                this.sprite.body.velocity.y = -this.speed;
            } else {
                this.sprite.body.velocity.y = 0;
            }
        }

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
  
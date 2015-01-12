
/// <reference path="../base/MoveableActor.ts"/>

class Enemy extends MoveableActor {

    private fireBehaviour:FireBehaviour;

    constructor(posX:number,posY:number,spriteName:string,game:Phaser.Game,groupName?:string) {
        super(posX,posY,spriteName,game,groupName);
        this.sprite.anchor.setTo(0.5,1);
        this.sprite.animations.add('walk',[0,1,2],6,true);
        this.sprite.body.setSize(24,32,0,0);
        this.fireBehaviour = new FireBehaviour(this.game,'imgParticle',500,'enemyBullets');
    }

    jump() {
        this.sprite.body.velocity.y = -100;
    }

    fire():void {
        var bullet:Phaser.Sprite = this.fireBehaviour.fire();
        if (bullet) {
            if (this.direction==Directions.LEFT) {
                bullet.reset(this.sprite.position.x-20,this.sprite.position.y-32);
                bullet.body.velocity.x = -500;
            } else {
                bullet.reset(this.sprite.position.x,this.sprite.position.y-32);
                bullet.body.velocity.x = 500;
            }
            bullet.scale.set(0.1,0.1);
        }

    }


    setDirection(direction:Directions):void {
        this.direction = direction;
        this.sprite.animations.play('walk');
        if (Directions.LEFT==direction) {
            this.sprite.body.velocity.x = - this.velocity;
            this.sprite.scale.setTo(1,1);
        }
        else if (Directions.RIGHT==direction) {
            this.sprite.body.velocity.x =  this.velocity;
            this.sprite.scale.setTo(-1,1);
        }
    }

    update(tileMap:Phaser.TilemapLayer,hero:Hero) {
        if (this.sprite['killed']) return;
        this.game.physics.arcade.collide(tileMap,this.sprite,()=>{
            if (this.sprite.body.blocked.left) {
                this.setDirection(Directions.RIGHT);
                this.jump();
            } else if (this.sprite.body.blocked.right) {
                this.setDirection(Directions.LEFT);
                this.jump();
            }
            if (this.sprite.position.x<=this.sprite.width) this.setDirection(Directions.RIGHT);
        });
        if (Math.abs(hero.sprite.position.x-this.sprite.position.x)<100) {
            this.fire();
        }
    }

    getDirection() {
        return this.direction;
    }




}

/// <reference path="../../engine/phaser.d.ts"/>
/// <reference path="../base/Actor.ts"/>
/// <reference path="../base/MoveableActor.ts"/>

// http://www.rpgmakervxace.net/user/3173-redxwhirlwind/?tab=reputation&app_tab=forums&type=given

class Hero extends MoveableActor {


    constructor(posX:number,posY:number,spriteName:string,game:Phaser.Game) {
        super(posX,posY,spriteName,game);
        this.initialFrame = 2;
        this.sprite.body.setSize(24,32,0,0);
        game.camera.follow(this.sprite);
        this.sprite.animations.add('walk',[0,1],12,true);
        this.sprite.frame = this.initialFrame;
        this.sprite.anchor.setTo(0.5,1);
        //game.input.keyboard.onUpCallback = ()=>this.stop();
    }

    setDirection(direction:Directions):void {
        this.direction = direction;
        this.sprite.animations.play('walk');
        if (Directions.LEFT==direction) {
            this.sprite.body.velocity.x = -this.velocity;
            this.sprite.scale.setTo(-1,1);
        }
        else if (Directions.RIGHT==direction) {
            this.sprite.body.velocity.x = this.velocity;
            this.sprite.scale.setTo(1,1);
        }
    }


    stop():void {
        this.sprite.animations.stop();
        this.sprite.body.velocity.x = 0;
        this.sprite.frame = this.initialFrame;
    }

    updateCursor(cursor:Phaser.CursorKeys):void {
        this.sprite.body.velocity.x = 0;
        //this.sprite.body.velocity.y = 0;
        if (cursor.right.isDown) {
            this.setDirection(Directions.RIGHT);
        } else if (cursor.left.isDown) {
            this.setDirection(Directions.LEFT);
        }

        if (!(this.sprite.body.touching.down || this.sprite.body.blocked.down || this.sprite.body.blocked.up)) {
            this.sprite.animations.stop();
            this.sprite.frame = this.initialFrame;
        }

        if (cursor.up.isDown && (this.sprite.body.blocked.down || this.sprite.body.touching.down)) {
            this.sprite.body.velocity.y = -170;
        }

        if (cursor.left.justUp || cursor.right.justUp) this.stop();

    }

}

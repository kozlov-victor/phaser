///<reference path="Actor.ts"/>


class MoveableActor extends Actor {

    velocity:number=100;
    direction:Directions;
    initialFrame:number = 0;

    constructor(posX:number,posY:number,spriteName:string,game:Phaser.Game,groupName?:string) {
        super(posX, posY, spriteName, game, groupName);
    }

    setDirection(direction:Directions):void {}

    getDirection() {
        return this.direction;
    }


    stop():void {
        this.sprite.animations.stop();
        this.sprite.body.velocity.x = 0;
        this.sprite.frame = this.initialFrame;
    }

}

enum Directions {
    LEFT=1,RIGHT=2,DOWN=3,UP=4
}

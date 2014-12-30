/// <reference path="../base/Actor.ts"/>

class SnowFlake extends Actor{

    constructor(posX:number,posY:number,spriteName:string,game:Phaser.Game,groupName?:string) {
        super(posX,posY,spriteName,game,groupName);
        this.sprite.animations.add('rotate',[0,1,2,3,4,5,6,7],10,true);
        this.sprite.animations.play('rotate');
        this.sprite.body.allowGravity = false;
    }

}

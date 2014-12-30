///<reference path="../base/MoveableActor.ts"/>

class Platform extends MoveableActor {

    private type:PlatformType = PlatformType.HORIZONTAL;
    private pointMin:number = 0;
    private pointMax:number = 100;

    constructor(posX:number,posY:number,spriteName:string,game:Phaser.Game,groupName?:string) {
        super(posX,posY,spriteName,game,groupName);
        this.sprite.frame = 1;
        this.sprite.body.allowGravity = false;
        this.sprite.body.immovable = true;
    }

    init(type:PlatformType,deltaPointMin:number,deltaPointMax:number,velocity:number) {
        this.type = type;
        if (type==PlatformType.HORIZONTAL) {
            this.pointMin = this.sprite.position.x-deltaPointMin;
            this.pointMax = this.sprite.position.x+deltaPointMax;
            this.setDirection(Directions.RIGHT);
        } else {
            this.pointMin = this.sprite.position.y-deltaPointMin;
            this.pointMax = this.sprite.position.y+deltaPointMax;
            this.setDirection(Directions.UP);
        }
        this.velocity = velocity;
    }

    setDirection(direction:Directions):void {
        this.direction = direction;
        switch (direction) {
            case Directions.RIGHT:
                this.sprite.body.velocity.x = this.velocity;
                break;
            case Directions.LEFT:
                this.sprite.body.velocity.x = - this.velocity;
                break;
            case Directions.UP:
                this.sprite.body.velocity.y = -this.velocity;
                break;
            case Directions.DOWN:
                this.sprite.body.velocity.y = this.velocity;
                break;
        }
    }

    update() {
        if (this.type==PlatformType.VERTICAL) {
            if (this.direction == Directions.UP) {
                if (this.sprite.position.y<this.pointMin) this.setDirection(Directions.DOWN);
            } else {
                if (this.sprite.position.y>this.pointMax) this.setDirection(Directions.UP);
            }
        } else {
            if (this.direction == Directions.LEFT) {
                if (this.sprite.position.x<this.pointMin) this.setDirection(Directions.RIGHT);
            } else {
                if (this.sprite.position.x>this.pointMax) this.setDirection(Directions.LEFT);
            }
        }
    }

}

enum PlatformType {
    HORIZONTAL,VERTICAL
}

/// <reference path="../engine/phaser.d.ts"/>


class LevelPassed extends Phaser.State {

    emitter:Phaser.Particles.Arcade.Emitter;

    public create():void {
        this.emitter = this.game.add.emitter();
        this.emitter.makeParticles(['imgParticle','sprSnowFlake'],[0],200);
        this.emitter.width = 100;
        this.emitter.height = 100;
        this.emitter.setAlpha(0.1,1.0);

        this.emit(100,100);
        for (var i=0;i<10;i++) {
            this.game.time.events.add(this.game.rnd.integerInRange(1000,5000),()=>{
                this.emit(
                    this.game.rnd.integerInRange(200,this.game.camera.width-200),
                    this.game.rnd.integerInRange(200,this.game.camera.height-200)
                );
            },this);
        }

        var text:Phaser.BitmapText=this.game.add.bitmapText(-100,12,'font','Уровень пройден!!!!!',20);
        this.game.add.tween(text.position).
            to({x:22},1000,Phaser.Easing.Bounce.Out).
            start();
    }

    private emit(x:number,y:number) {
        this.emitter.emitX = x;
        this.emitter.emitY = y;
        this.emitter.explode(3000,50);
    }

    public update():void {

    }


}

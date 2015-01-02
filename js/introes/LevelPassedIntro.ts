/// <reference path="../engine/phaser.d.ts"/>
/// <reference path="../levels/NextLevelManager.ts"/>


class LevelPassedIntro extends Phaser.State {

    emitter:Phaser.Particles.Arcade.Emitter;
    textWin:Phaser.BitmapText;
    textTitles:Phaser.BitmapText;
    nextLevelManager:NextLevelManager = NextLevelManager.getInstance();

    public create():void {
        this.emitter = this.game.add.emitter();
        this.emitter.makeParticles(['imgParticle','sprSnowFlake'],[0],200);
        this.emitter.width = 100;
        this.emitter.height = 100;
        this.emitter.setAlpha(0.1,1.0);


        if (this.nextLevelManager.isLast()) {
            this.textWin = this.game.add.bitmapText(
                20,
                80,
                'font',
                'Игра пройдена!!!',
                30
            );
            this.textTitles = this.game.add.bitmapText(
                10,
                500,
                'font',
                'Программирование: victor-kozlov\n'+
                'Основна идея\n'+
                'и  прочие дела\n'+
                'так же\n'+
                'victor-kozlov\n'+
                '"Сдесь может быть ваша реклама"\n'+
                'Всем привет)))))!\n',
                15
            );
            this.game.add.tween(this.textTitles.position)
                .to({y:-200},20000,Phaser.Easing.Linear.None)
            .start();
            this.game.time.events.add(3000,()=>{
                this.textWin.alpha = 0;
            },this);
        } else {
            var text:Phaser.BitmapText=this.game.add.bitmapText(-100,12,'font','Уровень пройден!!!!!',20);
            this.game.add.tween(text.position).
                to({x:22},1000,Phaser.Easing.Bounce.Out).
                start();
        }

        this.game.time.events.add(5000,()=>{
            if (this.nextLevelManager.isLast()) {
                console.log('game passed');
            } else {
                this.game.state.add('nextLevel',this.nextLevelManager.getNext());
                this.game.state.start('nextLevel');
            }
        },this);

        this.emit(100,100);
        for (var i=0;i<10;i++) {
            this.game.time.events.add(this.game.rnd.integerInRange(1000,5000),()=>{
                this.emit(
                    this.game.rnd.integerInRange(200,this.game.camera.width-200),
                    this.game.rnd.integerInRange(200,this.game.camera.height-200)
                );
            },this);
        }
    }

    private emit(x:number,y:number) {
        this.emitter.emitX = x;
        this.emitter.emitY = y;
        this.emitter.explode(3000,50);
    }

    public update():void {

    }


}

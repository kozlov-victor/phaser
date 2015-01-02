/// <reference path="../engine/phaser.d.ts"/>


class MainIntro extends Phaser.State {


    sprIntro:Phaser.Sprite;

    create() {
        this.sprIntro = this.game.add.sprite(this.game.world.width/2,this.game.world.height/2,'imgIntro');
        this.sprIntro.anchor.setTo(0.5,0.5);
        this.sprIntro.alpha = 0;
        this.game.tweens.
            create(this.sprIntro).
            to({alpha:1},2000,Phaser.Easing.Linear.None).
            start();
        var info:Phaser.BitmapText = this.game.add.bitmapText(22,-200,'font',
            'Это игра про Новый Год. Сам Санта \n' +
            'вышел каким-то китайским, \n' +
            'но знаете, как трудно найти хорошую \n' +
            'БЕСПЛАТНУЮ графику для игр',
            12
        );
        this.game.add.tween(info).
            to({y:5},450,Phaser.Easing.Bounce.Out).
            start();
        var label:Phaser.BitmapText = this.game.add.bitmapText(120,-200,'font',
            'Кликните для продолжения куда попало',
            10
        );
        this.game.add.tween(label.position).
            to({y:220},400,Phaser.Easing.Bounce.Out).
            start();
        var hero:Hero = new Hero(22,152,'sprHero',this.game);
        hero.sprite.animations.play('walk');
        this.game.canvas.onclick = ()=> {
            this.game.state.start('nextLevel');// levelPassedIntro
        };
        var copy:Phaser.BitmapText = this.game.add.bitmapText(-100,220,'font',
            '(c)kozlov-victor',
            12
        );
        this.game.add.tween(copy).
            to({x:22},3000,Phaser.Easing.Elastic.Out).
            start();


    }

    update() {

    }


}
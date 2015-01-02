/// <reference path="../engine/phaser.d.ts"/>
/// <reference path="../states/Boot.ts"/>
/// <reference path="../states/Preload.ts"/>
/// <reference path="../levels/generic/Levels.ts"/>
/// <reference path="../introes/MainIntro.ts"/>
/// <reference path="../introes/LevelPassed.ts"/>


class GameLauncher {

    game:Phaser.Game;

    constructor() {


        this.game = new Phaser.Game(320,240,Phaser.AUTO,'');
        this.game.state.add('boot',new Boot());
        this.game.state.add('preload',new Preload());
        this.game.state.add('game',new Level1());
        this.game.state.add('intro',new MainIntro());
        this.game.state.add('levelPassed',new LevelPassed());
        this.game.state.start('boot');
    }
}

window.onload = ()=> {
    new GameLauncher();
};

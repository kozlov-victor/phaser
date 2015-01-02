/// <reference path="../engine/phaser.d.ts"/>
/// <reference path="../states/Boot.ts"/>
/// <reference path="../states/Preload.ts"/>
/// <reference path="../levels/generic/Levels.ts"/>
/// <reference path="../levels/NextLevelManager.ts"/>
/// <reference path="../introes/MainIntro.ts"/>
/// <reference path="../introes/LevelPassedIntro.ts"/>


class GameLauncher {

    game:Phaser.Game;

    constructor() {

        NextLevelManager.getInstance().
            addLevel(new Level1()).
            addLevel(new Level2()).
            addLevel(new Level3());

        this.game = new Phaser.Game(320,240,Phaser.AUTO,'');
        this.game.state.add('boot',new Boot());
        this.game.state.add('preload',new Preload());
        this.game.state.add('nextLevel',NextLevelManager.getInstance().getFirst());
        this.game.state.add('intro',new MainIntro());
        this.game.state.add('levelPassedIntro',new LevelPassedIntro());
        this.game.state.start('boot');
    }
}

window.onload = ()=> {
    new GameLauncher();
};

/// <reference path="../engine/phaser.d.ts"/>

class Boot extends Phaser.State {

    preload():void {

        this.game.load.image('imgLoading','assets/images/imgLoading.png');
    }

    create():void {

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.game.state.start('preload');
    }

}


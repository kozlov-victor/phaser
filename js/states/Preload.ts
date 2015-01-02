/// <reference path="../engine/phaser.d.ts"/>

class Preload extends Phaser.State {

    preload():void {
        var preloadSprite:Phaser.Sprite = this.game.add.sprite(this.game.world.width/2,this.game.world.height/2,'imgLoading');
        preloadSprite.anchor.set(0.5,0.5);
        preloadSprite.scale.set(3,3);
        this.game.load.setPreloadSprite(preloadSprite);

        this.game.load.spritesheet('sprHero','assets/images/sprSanta.png',32,32);
        this.game.load.spritesheet('sprSnowFlake','assets/images/sprSnowFlake.png',60,60);
        this.game.load.image('imgIntro','assets/images/imgIntro.png');
        this.game.load.image('imgTiles','assets/images/imgTiles.png');
        this.game.load.spritesheet('sprTiles','assets/images/imgTiles.png',32,32);
        this.game.load.image('imgParticle','assets/images/imgParticle.png');

        this.game.load.bitmapFont('font','assets/data/font.png','assets/data/font.fnt');

        this.game.load.tilemap('mapLevel1','assets/data/mapLevel1.json',null,Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('mapLevel2','assets/data/mapLevel2.json',null,Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('mapLevel3','assets/data/mapLevel3.json',null,Phaser.Tilemap.TILED_JSON);

    }

    create():void {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 0;
        this.game.state.start('intro');
    }

}

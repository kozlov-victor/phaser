/// <reference path="../engine/phaser.d.ts"/>
/// <reference path="../actors/generics/Hero.ts"/>
/// <reference path="LevelOptions.ts"/>
/// <reference path="../actors/generics/SnowFlake.ts"/>
/// <reference path="../actors/generics/Platform.ts"/>
/// <reference path="../utils/TileMapUtil.ts"/>

class BaseLevel extends Phaser.State {

    hero:Hero;
    cursor:Phaser.CursorKeys;
    tileMapUtil:TileMapUtil;
    emitter:Phaser.Particles.Arcade.Emitter;
    platform:Platform;

    public initLevel(opts:LevelOptions):void {
        this.game.physics.arcade.gravity.y = 200;
        this.game.canvas.onclick = null;
        this.cursor = this.game.input.keyboard.createCursorKeys();
        this.hero = new Hero(opts.heroPosX,opts.heroPosY,'sprHero',this.game);

        this.tileMapUtil = new TileMapUtil(this.game);
        this.tileMapUtil.createMap(
            opts.levelMap,'mainTileSet','imgTiles','mainLayer','objectLayer',[1,2,3]
        );
        this.tileMapUtil.getMapObjects().forEach((el)=>{
            if (el.properties.type==='snowFlake') {
                new SnowFlake(el.x,el.y-60,'sprSnowFlake',this.game,'snowFlakes');
            }
        });
        new SnowFlake(opts.heroPosX+150,opts.heroPosY,'sprSnowFlake',this.game,'snowFlakes');
        this.platform = new Platform(opts.heroPosX+150,opts.heroPosY+18,'sprTiles',this.game,'platforms');
        this.platform.init(PlatformType.VERTICAL,50,120,100);
        this.emitter = this.game.add.emitter();
        this.emitter.makeParticles(['imgParticle','sprSnowFlake'],[0],200);
        this.emitter.width = 20;
        this.emitter.height = 20;
        this.emitter.setAlpha(0.1,1.0);

    }

    public update():void {
        Platform.getGroupRawArr('platforms').forEach(function(pl:Platform){
            pl.update();
        });
        this.game.physics.arcade.collide(this.hero.sprite,Platform.getGroup('platforms'));
        this.game.physics.arcade.collide(this.hero.sprite,this.tileMapUtil.getMainLayer());
        this.game.physics.arcade.collide(this.hero.sprite,SnowFlake.getGroup('snowFlakes'),
            (hero:Phaser.Sprite,showFlake:Phaser.Sprite)=>{
                showFlake.kill();
                this.emitter.emitX = showFlake.position.x;
                this.emitter.emitY = showFlake.position.y;
                this.emitter.explode(3000,20);
            }
        );
        this.hero.updateCursor(this.cursor);
    }

}

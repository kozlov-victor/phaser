/// <reference path="../engine/phaser.d.ts"/>
/// <reference path="../actors/generics/Hero.ts"/>
/// <reference path="../actors/generics/Enemy.ts"/>
/// <reference path="LevelOptions.ts"/>
/// <reference path="../actors/generics/SnowFlake.ts"/>
/// <reference path="../actors/generics/Platform.ts"/>
/// <reference path="../utils/TileMapUtil.ts"/>

class BaseLevel extends Phaser.State {

    hero:Hero;
    cursor:Phaser.CursorKeys;
    tileMapUtil:TileMapUtil;
    emitter:Phaser.Particles.Arcade.Emitter;
    healthLabel:Phaser.Text;

    collected:number = 0;

    public initLevel(opts:LevelOptions):void {
        this.game.physics.arcade.gravity.y = 200;
        this.game.canvas.onclick = null;
        Actor.clear();
        this.cursor = this.game.input.keyboard.createCursorKeys();
        this.hero = new Hero(opts.heroPosX,opts.heroPosY,'sprHero',this.game);

        this.tileMapUtil = new TileMapUtil(this.game);
        this.tileMapUtil.createMap(
            opts.levelMap,'mainTileSet','imgTiles','mainLayer','objectLayer',[1,2,3]
        );
        this.tileMapUtil.getMapObjects().forEach((el)=>{
            switch (el.properties.type) {
                case 'snowFlake':
                    new SnowFlake(el.x,el.y-60,'sprSnowFlake',this.game,'snowFlakes');
                    break;
                case 'platform':
                    var platform = new Platform(el.x,el.y-60,'sprTiles',this.game,'platforms');
                    platform.init(
                        Platform.getTypeFromInt(el.properties.platformType),
                        el.properties.deltaPointMin,
                        el.properties.deltaPointMax,
                        100
                    );
                    break;

            }
        });
        for (var i=0;i<5;i++){
            var enemy = new Enemy(Math.random()*500+i*100,122,'sprEnemy',this.game,'enemies');
            enemy.setDirection(Directions.LEFT);
        }
        this.emitter = this.game.add.emitter();
        this.emitter.makeParticles(['imgParticle','sprSnowFlake'],[0],200);
        this.emitter.width = 20;
        this.emitter.height = 20;
        this.emitter.setAlpha(0.1,1.0);

        this.healthLabel = this.game.add.text(10,10,'',{font:'Arial 2px',fill:'#fff'});
        this.healthLabel.fixedToCamera = true;

    }

    public update():void {
        Platform.getGroupRawArr('platforms').forEach((pl:Platform)=>{
            pl.update();
        });
        var __this:BaseLevel = this;
        Enemy.getGroupRawArr('enemies').forEach((en:Enemy)=>{
            if (en.sprite['killed']) return;
            en.update(__this.tileMapUtil.getMainLayer(),__this.hero);
            __this.game.physics.arcade.collide(Bullet.getGroup('enemyBullets'),this.tileMapUtil.getMainLayer(),
                (bullet:Phaser.Sprite)=>{
                    bullet.kill();
                }
            );
        });
        this.game.physics.arcade.collide(this.hero.sprite,Platform.getGroup('platforms'));
        this.game.physics.arcade.collide(this.hero.sprite,this.tileMapUtil.getMainLayer());
        this.game.physics.arcade.collide(Bullet.getGroup('heroBullets'),this.tileMapUtil.getMainLayer(),
            (bullet:Phaser.Sprite)=>{
                bullet.kill();
            }
        );
        this.game.physics.arcade.collide(this.hero.sprite,Enemy.getGroup('enemies'));
        this.game.physics.arcade.collide(Enemy.getGroup('enemies'),Enemy.getGroup('enemies'));
        this.game.physics.arcade.collide(Bullet.getGroup('heroBullets'),Enemy.getGroup('enemies'),
            (bullet:Phaser.Sprite,enemy:Phaser.Sprite)=>{
                bullet.kill();
                enemy.kill();
                enemy['killed'] = true;
            }
        );
        this.game.physics.arcade.collide(this.hero.sprite,Bullet.getGroup('enemyBullets'),
            (heroSpr:Phaser.Sprite,bulletSpr:Phaser.Sprite)=>{
                this.hero.hurt(10);
                bulletSpr.kill();
            }
        );
        this.game.physics.arcade.collide(this.hero.sprite,SnowFlake.getGroup('snowFlakes'),
            (hero:Phaser.Sprite,showFlake:Phaser.Sprite)=>{
                showFlake.kill();
                this.emitter.emitX = showFlake.position.x;
                this.emitter.emitY = showFlake.position.y;
                this.emitter.explode(3000,20);
                if (++this.collected==SnowFlake.getGroupRawArr('snowFlakes').length) {
                    this.game.time.events.add(1000,()=>{
                        this.game.state.start('levelPassedIntro');
                    },this);
                }
            }
        );
        this.hero.updateCursor(this.cursor);
        this.hero.updateHealth(this.healthLabel);
    }

}

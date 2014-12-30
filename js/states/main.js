/// <reference path="../engine/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Boot = (function (_super) {
    __extends(Boot, _super);
    function Boot() {
        _super.apply(this, arguments);
    }
    Boot.prototype.preload = function () {
        this.game.load.image('imgLoading', 'assets/images/imgLoading.png');
    };
    Boot.prototype.create = function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.startFullScreen(true); //
        this.game.state.start('preload');
    };
    return Boot;
})(Phaser.State);
/// <reference path="../engine/phaser.d.ts"/>
var Preload = (function (_super) {
    __extends(Preload, _super);
    function Preload() {
        _super.apply(this, arguments);
    }
    Preload.prototype.preload = function () {
        var preloadSprite = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'imgLoading');
        preloadSprite.anchor.set(0.5, 0.5);
        preloadSprite.scale.set(3, 3);
        this.game.load.setPreloadSprite(preloadSprite);
        this.game.load.spritesheet('sprHero', 'assets/images/sprSanta.png', 32, 32);
        this.game.load.spritesheet('sprSnowFlake', 'assets/images/sprSnowFlake.png', 60, 60);
        this.game.load.image('imgIntro', 'assets/images/imgIntro.png');
        this.game.load.image('imgTiles', 'assets/images/imgTiles.png');
        this.game.load.spritesheet('sprTiles', 'assets/images/imgTiles.png', 32, 32);
        this.game.load.image('imgParticle', 'assets/images/imgParticle.png');
        this.game.load.bitmapFont('font', 'assets/data/font.png', 'assets/data/font.fnt');
        this.game.load.tilemap('mapLevel1', 'assets/data/mapLevel1.json', null, Phaser.Tilemap.TILED_JSON);
    };
    Preload.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 0;
        this.game.state.start('intro');
    };
    return Preload;
})(Phaser.State);
/// <reference path="../../engine/phaser.d.ts"/>
var Actor = (function () {
    function Actor(posX, posY, spriteName, game, groupName) {
        this.game = game;
        this.sprite = game.add.sprite(posX, posY, spriteName);
        game.physics.arcade.enable(this.sprite);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.gravity.y = 0;
        if (groupName) {
            if (!Actor.groups[groupName])
                Actor.groups[groupName] = game.add.group();
            Actor.groups[groupName].add(this.sprite);
            if (!Actor.groupsRawArr[groupName])
                Actor.groupsRawArr[groupName] = [];
            Actor.groupsRawArr[groupName].push(this);
        }
    }
    Actor.getGroup = function (groupName) {
        return Actor.groups[groupName];
    };
    Actor.getGroupRawArr = function (groupName) {
        return Actor.groupsRawArr[groupName];
    };
    Actor.groups = {};
    Actor.groupsRawArr = {};
    return Actor;
})();
///<reference path="Actor.ts"/>
var MoveableActor = (function (_super) {
    __extends(MoveableActor, _super);
    function MoveableActor(posX, posY, spriteName, game, groupName) {
        _super.call(this, posX, posY, spriteName, game, groupName);
        this.velocity = 100;
        this.initialFrame = 0;
    }
    MoveableActor.prototype.setDirection = function (direction) {
    };
    MoveableActor.prototype.getDirection = function () {
        return this.direction;
    };
    MoveableActor.prototype.stop = function () {
        this.sprite.animations.stop();
        this.sprite.body.velocity.x = 0;
        this.sprite.frame = this.initialFrame;
    };
    return MoveableActor;
})(Actor);
var Directions;
(function (Directions) {
    Directions[Directions["LEFT"] = 0] = "LEFT";
    Directions[Directions["RIGHT"] = 1] = "RIGHT";
    Directions[Directions["DOWN"] = 2] = "DOWN";
    Directions[Directions["UP"] = 3] = "UP";
})(Directions || (Directions = {}));
/// <reference path="../../engine/phaser.d.ts"/>
/// <reference path="../base/Actor.ts"/>
/// <reference path="../base/MoveableActor.ts"/>
// http://www.rpgmakervxace.net/user/3173-redxwhirlwind/?tab=reputation&app_tab=forums&type=given
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(posX, posY, spriteName, game) {
        var _this = this;
        _super.call(this, posX, posY, spriteName, game);
        this.initialFrame = 2;
        this.sprite.body.setSize(24, 32, 0, 0);
        game.camera.follow(this.sprite);
        this.sprite.animations.add('walk', [0, 1], 12, true);
        this.sprite.frame = this.initialFrame;
        this.sprite.anchor.setTo(0.5, 1);
        game.input.keyboard.onUpCallback = function () { return _this.stop(); };
    }
    Hero.prototype.setDirection = function (direction) {
        this.direction = direction;
        this.sprite.animations.play('walk');
        if (0 /* LEFT */ == direction) {
            this.sprite.body.velocity.x = -this.velocity;
            this.sprite.scale.setTo(-1, 1);
        }
        else if (1 /* RIGHT */ == direction) {
            this.sprite.body.velocity.x = this.velocity;
            this.sprite.scale.setTo(1, 1);
        }
    };
    Hero.prototype.stop = function () {
        this.sprite.animations.stop();
        this.sprite.body.velocity.x = 0;
        this.sprite.frame = this.initialFrame;
    };
    Hero.prototype.updateCursor = function (cursor) {
        this.sprite.body.velocity.x = 0;
        //this.sprite.body.velocity.y = 0;
        if (cursor.right.isDown) {
            this.setDirection(1 /* RIGHT */);
        }
        else if (cursor.left.isDown) {
            this.setDirection(0 /* LEFT */);
        }
        if (!(this.sprite.body.touching.down || this.sprite.body.blocked.down || this.sprite.body.blocked.up)) {
            this.sprite.animations.stop();
            this.sprite.frame = this.initialFrame;
        }
        if (cursor.up.isDown && (this.sprite.body.blocked.down || this.sprite.body.touching.down)) {
            this.sprite.body.velocity.y = -170;
        }
    };
    return Hero;
})(MoveableActor);
/// <reference path="../base/Actor.ts"/>
var SnowFlake = (function (_super) {
    __extends(SnowFlake, _super);
    function SnowFlake(posX, posY, spriteName, game, groupName) {
        _super.call(this, posX, posY, spriteName, game, groupName);
        this.sprite.animations.add('rotate', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.sprite.animations.play('rotate');
        this.sprite.body.allowGravity = false;
    }
    return SnowFlake;
})(Actor);
///<reference path="../base/MoveableActor.ts"/>
var Platform = (function (_super) {
    __extends(Platform, _super);
    function Platform(posX, posY, spriteName, game, groupName) {
        _super.call(this, posX, posY, spriteName, game, groupName);
        this.type = 0 /* HORIZONTAL */;
        this.pointMin = 0;
        this.pointMax = 100;
        this.sprite.frame = 1;
        this.sprite.body.allowGravity = false;
        this.sprite.body.immovable = true;
    }
    Platform.prototype.init = function (type, deltaPointMin, deltaPointMax, velocity) {
        this.type = type;
        if (type == 0 /* HORIZONTAL */) {
            this.pointMin = this.sprite.position.x - deltaPointMin;
            this.pointMax = this.sprite.position.x + deltaPointMax;
            this.setDirection(1 /* RIGHT */);
        }
        else {
            this.pointMin = this.sprite.position.y - deltaPointMin;
            this.pointMax = this.sprite.position.y + deltaPointMax;
            this.setDirection(3 /* UP */);
        }
        this.velocity = velocity;
    };
    Platform.prototype.setDirection = function (direction) {
        this.direction = direction;
        switch (direction) {
            case 1 /* RIGHT */:
                this.sprite.body.velocity.x = this.velocity;
                break;
            case 0 /* LEFT */:
                this.sprite.body.velocity.x = -this.velocity;
                break;
            case 3 /* UP */:
                this.sprite.body.velocity.y = -this.velocity;
                break;
            case 2 /* DOWN */:
                this.sprite.body.velocity.y = this.velocity;
                break;
        }
    };
    Platform.prototype.update = function () {
        if (this.type == 1 /* VERTICAL */) {
            if (this.direction == 3 /* UP */) {
                if (this.sprite.position.y < this.pointMin)
                    this.setDirection(2 /* DOWN */);
            }
            else {
                if (this.sprite.position.y > this.pointMax)
                    this.setDirection(3 /* UP */);
            }
        }
        else {
            if (this.direction == 0 /* LEFT */) {
                if (this.sprite.position.x < this.pointMin)
                    this.setDirection(1 /* RIGHT */);
            }
            else {
                if (this.sprite.position.x > this.pointMax)
                    this.setDirection(0 /* LEFT */);
            }
        }
    };
    return Platform;
})(MoveableActor);
var PlatformType;
(function (PlatformType) {
    PlatformType[PlatformType["HORIZONTAL"] = 0] = "HORIZONTAL";
    PlatformType[PlatformType["VERTICAL"] = 1] = "VERTICAL";
})(PlatformType || (PlatformType = {}));
/// <reference path="../engine/phaser.d.ts"/>
var TileMapUtil = (function () {
    function TileMapUtil(game) {
        this.game = game;
    }
    TileMapUtil.prototype.createMap = function (levelMapResourceName, tileSetInTiledName, imgTilesResourceName, mainLayerInTiledName, objectLayerInTiledName, collisions) {
        this.objectLayerName = objectLayerInTiledName;
        this.tileMap = this.game.add.tilemap(levelMapResourceName);
        this.tileMap.addTilesetImage(tileSetInTiledName, imgTilesResourceName);
        this.mainLayer = this.tileMap.createLayer(mainLayerInTiledName);
        this.mainLayer.resizeWorld();
        this.tileMap.setCollision(collisions, true, mainLayerInTiledName);
        //this.mainLayer.debug = true;
    };
    TileMapUtil.prototype.getMapObjects = function () {
        return this.tileMap.objects[this.objectLayerName];
    };
    TileMapUtil.prototype.getMainLayer = function () {
        return this.mainLayer;
    };
    return TileMapUtil;
})();
/// <reference path="../engine/phaser.d.ts"/>
/// <reference path="../actors/generics/Hero.ts"/>
/// <reference path="LevelOptions.ts"/>
/// <reference path="../actors/generics/SnowFlake.ts"/>
/// <reference path="../actors/generics/Platform.ts"/>
/// <reference path="../utils/TileMapUtil.ts"/>
var BaseLevel = (function (_super) {
    __extends(BaseLevel, _super);
    function BaseLevel() {
        _super.apply(this, arguments);
    }
    BaseLevel.prototype.initLevel = function (opts) {
        var _this = this;
        this.game.physics.arcade.gravity.y = 200;
        this.game.canvas.onclick = null;
        this.cursor = this.game.input.keyboard.createCursorKeys();
        this.hero = new Hero(opts.heroPosX, opts.heroPosY, 'sprHero', this.game);
        this.tileMapUtil = new TileMapUtil(this.game);
        this.tileMapUtil.createMap(opts.levelMap, 'mainTileSet', 'imgTiles', 'mainLayer', 'objectLayer', [1, 2, 3]);
        this.tileMapUtil.getMapObjects().forEach(function (el) {
            if (el.properties.type === 'snowFlake') {
                new SnowFlake(el.x, el.y - 60, 'sprSnowFlake', _this.game, 'snowFlakes');
            }
        });
        new SnowFlake(opts.heroPosX + 150, opts.heroPosY, 'sprSnowFlake', this.game, 'snowFlakes');
        this.platform = new Platform(opts.heroPosX + 150, opts.heroPosY + 18, 'sprTiles', this.game, 'platforms');
        this.platform.init(1 /* VERTICAL */, 50, 120, 100);
        this.emitter = this.game.add.emitter();
        this.emitter.makeParticles(['imgParticle', 'sprSnowFlake'], [0], 200);
        this.emitter.width = 20;
        this.emitter.height = 20;
        this.emitter.setAlpha(0.1, 1.0);
    };
    BaseLevel.prototype.update = function () {
        var _this = this;
        Platform.getGroupRawArr('platforms').forEach(function (pl) {
            pl.update();
        });
        this.game.physics.arcade.collide(this.hero.sprite, Platform.getGroup('platforms'));
        this.game.physics.arcade.collide(this.hero.sprite, this.tileMapUtil.getMainLayer());
        this.game.physics.arcade.collide(this.hero.sprite, SnowFlake.getGroup('snowFlakes'), function (hero, showFlake) {
            showFlake.kill();
            _this.emitter.emitX = showFlake.position.x;
            _this.emitter.emitY = showFlake.position.y;
            _this.emitter.explode(3000, 20);
        });
        this.hero.updateCursor(this.cursor);
    };
    return BaseLevel;
})(Phaser.State);
/// <reference path="../engine/phaser.d.ts"/>
/// <reference path="../levels/BaseLevel.ts"/>
var Level1 = (function (_super) {
    __extends(Level1, _super);
    function Level1() {
        _super.apply(this, arguments);
    }
    Level1.prototype.create = function () {
        this.initLevel({
            heroPosX: 64,
            heroPosY: 564,
            levelMap: 'mapLevel1',
            levelBgSound: 'bgSound'
        });
        console.log('%c level1 ok', 'color: green;font-weight:bolder;font-size:24px;');
    };
    Level1.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    return Level1;
})(BaseLevel);
/// <reference path="../engine/phaser.d.ts"/>
var MainIntro = (function (_super) {
    __extends(MainIntro, _super);
    function MainIntro() {
        _super.apply(this, arguments);
    }
    MainIntro.prototype.create = function () {
        var _this = this;
        this.sprIntro = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'imgIntro');
        this.sprIntro.anchor.setTo(0.5, 0.5);
        this.sprIntro.alpha = 0;
        this.game.tweens.create(this.sprIntro).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();
        var info = this.game.add.bitmapText(22, -200, 'font', 'Это игра про Новый Год. Сам Санта \n' + 'вышел каким-то китайским, \n' + 'но знаете, как трудно найти хорошую \n' + 'БЕСПЛАТНУЮ графику для игр', 12);
        this.game.add.tween(info).to({ y: 5 }, 450, Phaser.Easing.Bounce.Out).start();
        var label = this.game.add.bitmapText(120, -200, 'font', 'Кликните для продолжения куда попало', 10);
        this.game.add.tween(label.position).to({ y: 220 }, 400, Phaser.Easing.Bounce.Out).start();
        var hero = new Hero(22, 152, 'sprHero', this.game);
        hero.sprite.animations.play('walk');
        this.game.canvas.onclick = function () {
            _this.game.state.start('game');
        };
        var copy = this.game.add.bitmapText(-100, 220, 'font', '(c)kozlov-victor', 12);
        this.game.add.tween(copy).to({ x: 22 }, 3000, Phaser.Easing.Elastic.Out).start();
        //this.game.time.events.add(5000,()=>{
        //    this.game.state.start('game');
        //},null);
    };
    MainIntro.prototype.update = function () {
    };
    return MainIntro;
})(Phaser.State);
/// <reference path="../engine/phaser.d.ts"/>
/// <reference path="../states/Boot.ts"/>
/// <reference path="../states/Preload.ts"/>
/// <reference path="../levels/Level1.ts"/>
/// <reference path="../introes/MainIntro.ts"/>
var GameLauncher = (function () {
    function GameLauncher() {
        this.game = new Phaser.Game(320, 240, Phaser.AUTO, '');
        this.game.state.add('boot', new Boot());
        this.game.state.add('preload', new Preload());
        this.game.state.add('game', new Level1());
        this.game.state.add('intro', new MainIntro());
        this.game.state.start('boot');
    }
    return GameLauncher;
})();
window.onload = function () {
    new GameLauncher();
};
//# sourceMappingURL=main.js.map
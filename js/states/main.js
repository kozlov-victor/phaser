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
        return Actor.groups[groupName] || [];
    };
    Actor.getGroupRawArr = function (groupName) {
        return Actor.groupsRawArr[groupName] || [];
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
    Directions[Directions["LEFT"] = 1] = "LEFT";
    Directions[Directions["RIGHT"] = 2] = "RIGHT";
    Directions[Directions["DOWN"] = 3] = "DOWN";
    Directions[Directions["UP"] = 4] = "UP";
})(Directions || (Directions = {}));
/// <reference path="../../engine/phaser.d.ts"/>
/// <reference path="../base/Actor.ts"/>
/// <reference path="../base/MoveableActor.ts"/>
// http://www.rpgmakervxace.net/user/3173-redxwhirlwind/?tab=reputation&app_tab=forums&type=given
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(posX, posY, spriteName, game) {
        _super.call(this, posX, posY, spriteName, game);
        this.initialFrame = 2;
        this.sprite.body.setSize(24, 32, 0, 0);
        game.camera.follow(this.sprite);
        this.sprite.animations.add('walk', [0, 1], 12, true);
        this.sprite.frame = this.initialFrame;
        this.sprite.anchor.setTo(0.5, 1);
        //game.input.keyboard.onUpCallback = ()=>this.stop();
    }
    Hero.prototype.setDirection = function (direction) {
        this.direction = direction;
        this.sprite.animations.play('walk');
        if (1 /* LEFT */ == direction) {
            this.sprite.body.velocity.x = -this.velocity;
            this.sprite.scale.setTo(-1, 1);
        }
        else if (2 /* RIGHT */ == direction) {
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
            this.setDirection(2 /* RIGHT */);
        }
        else if (cursor.left.isDown) {
            this.setDirection(1 /* LEFT */);
        }
        if (!(this.sprite.body.touching.down || this.sprite.body.blocked.down || this.sprite.body.blocked.up)) {
            this.sprite.animations.stop();
            this.sprite.frame = this.initialFrame;
        }
        if (cursor.up.isDown && (this.sprite.body.blocked.down || this.sprite.body.touching.down)) {
            this.sprite.body.velocity.y = -170;
        }
        if (cursor.left.justUp || cursor.right.justUp)
            this.stop();
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
        this.type = 1 /* HORIZONTAL */;
        this.pointMin = 0;
        this.pointMax = 100;
        this.sprite.frame = 1;
        this.sprite.body.allowGravity = false;
        this.sprite.body.immovable = true;
    }
    Platform.getTypeFromInt = function (n) {
        return (+n == 1) ? 1 /* HORIZONTAL */ : 2 /* VERTICAL */;
    };
    Platform.prototype.init = function (type, deltaPointMin, deltaPointMax, velocity) {
        this.type = type;
        if (type == 1 /* HORIZONTAL */) {
            this.pointMin = this.sprite.position.x - deltaPointMin;
            this.pointMax = this.sprite.position.x + (+deltaPointMax);
            this.setDirection(2 /* RIGHT */);
        }
        else {
            this.pointMin = this.sprite.position.y - deltaPointMin;
            this.pointMax = this.sprite.position.y + (+deltaPointMax);
            this.setDirection(4 /* UP */);
        }
        this.velocity = velocity;
    };
    Platform.prototype.setDirection = function (direction) {
        this.direction = direction;
        switch (direction) {
            case 2 /* RIGHT */:
                this.sprite.body.velocity.x = this.velocity;
                break;
            case 1 /* LEFT */:
                this.sprite.body.velocity.x = -this.velocity;
                break;
            case 4 /* UP */:
                this.sprite.body.velocity.y = -this.velocity;
                break;
            case 3 /* DOWN */:
                this.sprite.body.velocity.y = this.velocity;
                break;
        }
    };
    Platform.prototype.update = function () {
        if (this.type == 2 /* VERTICAL */) {
            if (this.direction == 4 /* UP */) {
                if (this.sprite.position.y < this.pointMin)
                    this.setDirection(3 /* DOWN */);
            }
            else {
                if (this.sprite.position.y > this.pointMax)
                    this.setDirection(4 /* UP */);
            }
        }
        else {
            if (this.direction == 1 /* LEFT */) {
                if (this.sprite.position.x < this.pointMin)
                    this.setDirection(2 /* RIGHT */);
            }
            else {
                if (this.sprite.position.x > this.pointMax)
                    this.setDirection(1 /* LEFT */);
            }
        }
    };
    return Platform;
})(MoveableActor);
var PlatformType;
(function (PlatformType) {
    PlatformType[PlatformType["HORIZONTAL"] = 1] = "HORIZONTAL";
    PlatformType[PlatformType["VERTICAL"] = 2] = "VERTICAL";
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
        this.collected = 0;
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
            switch (el.properties.type) {
                case 'snowFlake':
                    new SnowFlake(el.x, el.y - 60, 'sprSnowFlake', _this.game, 'snowFlakes');
                    break;
                case 'platform':
                    var platform = new Platform(el.x, el.y - 60, 'sprTiles', _this.game, 'platforms');
                    platform.init(Platform.getTypeFromInt(el.properties.platformType), el.properties.deltaPointMin, el.properties.deltaPointMax, 100);
                    break;
            }
        });
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
            if (++_this.collected == SnowFlake.getGroupRawArr('snowFlakes').length) {
                _this.game.time.events.add(1000, function () {
                    _this.game.state.start('levelPassed');
                }, _this);
            }
        });
        this.hero.updateCursor(this.cursor);
    };
    return BaseLevel;
})(Phaser.State);
/// <reference path="../../engine/phaser.d.ts"/>
/// <reference path="../BaseLevel.ts"/>
var Level1 = (function (_super) {
    __extends(Level1, _super);
    function Level1() {
        _super.apply(this, arguments);
    }
    Level1.prototype.create = function () {
        this.initLevel({
            heroPosX: 12,
            heroPosY: 64,
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
var Level2 = (function (_super) {
    __extends(Level2, _super);
    function Level2() {
        _super.apply(this, arguments);
    }
    Level2.prototype.create = function () {
        this.initLevel({
            heroPosX: 12,
            heroPosY: 64,
            levelMap: 'mapLevel2',
            levelBgSound: 'bgSound'
        });
        console.log('%c level2 ok', 'color: green;font-weight:bolder;font-size:24px;');
    };
    Level2.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    return Level2;
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
    };
    MainIntro.prototype.update = function () {
    };
    return MainIntro;
})(Phaser.State);
/// <reference path="../engine/phaser.d.ts"/>
var LevelPassed = (function (_super) {
    __extends(LevelPassed, _super);
    function LevelPassed() {
        _super.apply(this, arguments);
    }
    LevelPassed.prototype.create = function () {
        var _this = this;
        this.emitter = this.game.add.emitter();
        this.emitter.makeParticles(['imgParticle', 'sprSnowFlake'], [0], 200);
        this.emitter.width = 100;
        this.emitter.height = 100;
        this.emitter.setAlpha(0.1, 1.0);
        this.emit(100, 100);
        for (var i = 0; i < 10; i++) {
            this.game.time.events.add(this.game.rnd.integerInRange(1000, 5000), function () {
                _this.emit(_this.game.rnd.integerInRange(200, _this.game.camera.width - 200), _this.game.rnd.integerInRange(200, _this.game.camera.height - 200));
            }, this);
        }
        var text = this.game.add.bitmapText(-100, 12, 'font', 'Уровень пройден!!!!!', 20);
        this.game.add.tween(text.position).to({ x: 22 }, 1000, Phaser.Easing.Bounce.Out).start();
    };
    LevelPassed.prototype.emit = function (x, y) {
        this.emitter.emitX = x;
        this.emitter.emitY = y;
        this.emitter.explode(3000, 50);
    };
    LevelPassed.prototype.update = function () {
    };
    return LevelPassed;
})(Phaser.State);
/// <reference path="../engine/phaser.d.ts"/>
/// <reference path="../states/Boot.ts"/>
/// <reference path="../states/Preload.ts"/>
/// <reference path="../levels/generic/Levels.ts"/>
/// <reference path="../introes/MainIntro.ts"/>
/// <reference path="../introes/LevelPassed.ts"/>
var GameLauncher = (function () {
    function GameLauncher() {
        this.game = new Phaser.Game(320, 240, Phaser.AUTO, '');
        this.game.state.add('boot', new Boot());
        this.game.state.add('preload', new Preload());
        this.game.state.add('game', new Level1());
        this.game.state.add('intro', new MainIntro());
        this.game.state.add('levelPassed', new LevelPassed());
        this.game.state.start('boot');
    }
    return GameLauncher;
})();
window.onload = function () {
    new GameLauncher();
};
//# sourceMappingURL=main.js.map
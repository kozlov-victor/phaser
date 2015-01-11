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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
///<reference path="BaseLevel.ts"/>
var NextLevelManager = (function () {
    function NextLevelManager() {
        this.levels = [];
        this.currentLevelNumber = 0;
        this.instanceCrested = false;
        this.instance = null;
        if (this.instanceCrested)
            throw new Error('use getInstance instead of constructor');
        this.instanceCrested = true;
    }
    NextLevelManager.prototype.getInstance = function () {
        if (!this.instance)
            this.instance = new NextLevelManager();
        return this.instance;
    };
    NextLevelManager.prototype.addLevel = function (level) {
        this.levels.push(level);
    };
    NextLevelManager.prototype.getFirst = function () {
        return this.levels[0];
    };
    NextLevelManager.prototype.getNext = function () {
        this.currentLevelNumber++;
        return this.levels[this.currentLevelNumber];
    };
    NextLevelManager.prototype.isLast = function () {
        return this.levels.length - 1 == this.currentLevelNumber;
    };
    return NextLevelManager;
})();
//# sourceMappingURL=main.js.map
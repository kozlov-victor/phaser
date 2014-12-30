var Directions;
(function (Directions) {
    Directions[Directions["LEFT"] = 0] = "LEFT";
    Directions[Directions["RIGHT"] = 1] = "RIGHT";
    Directions[Directions["DOWN"] = 2] = "DOWN";
    Directions[Directions["UP"] = 3] = "UP";
})(Directions || (Directions = {}));
/// <reference path="../../engine/phaser.d.ts"/>
var Actor = (function () {
    function Actor(posX, posY, spriteName, game, groupName) {
        this.sprite = game.add.sprite(posX, posY, spriteName);
        game.physics.arcade.enable(this.sprite);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.gravity.y = 0;
        if (groupName) {
            if (!Actor.groups[groupName])
                Actor.groups[groupName] = game.add.group();
            Actor.groups[groupName].add(this.sprite);
        }
    }
    Actor.getGroup = function (groupName) {
        return Actor.groups[groupName];
    };
    Actor.groups = {};
    return Actor;
})();
///<reference path="Directions.ts"/>
///<reference path="Actor.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MoveableActor = (function (_super) {
    __extends(MoveableActor, _super);
    function MoveableActor() {
        _super.apply(this, arguments);
        this.velocity = 100;
        this.initialFrame = 2;
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
//# sourceMappingURL=main.js.map
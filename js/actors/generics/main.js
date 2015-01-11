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
    Actor.clear = function () {
        Actor.groups = {};
        Actor.groupsRawArr = {};
    };
    Actor.groups = {};
    Actor.groupsRawArr = {};
    return Actor;
})();
/// <reference path="../base/Actor.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(posX, posY, spriteName, game, groupName) {
        _super.call(this, posX, posY, spriteName, game, groupName);
        this.sprite.anchor.setTo(0.5, 1);
    }
    return Enemy;
})(Actor);
//# sourceMappingURL=main.js.map
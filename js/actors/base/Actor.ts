/// <reference path="../../engine/phaser.d.ts"/>


class Actor {
    sprite:Phaser.Sprite;
    private static groups={};
    private static groupsRawArr = {};
    game:Phaser.Game;

    constructor(posX:number,posY:number,spriteName:string,game:Phaser.Game,groupName?:string) {
        this.game = game;
        this.sprite = game.add.sprite(posX,posY,spriteName);
        game.physics.arcade.enable(this.sprite);
        game.physics.enable(this.sprite,Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.gravity.y = 0;
        if (groupName) {
            if (!Actor.groups[groupName]) Actor.groups[groupName] = game.add.group();
            (<Phaser.Group>Actor.groups[groupName]).add(this.sprite);
            if (!Actor.groupsRawArr[groupName]) Actor.groupsRawArr[groupName] = [];
            Actor.groupsRawArr[groupName].push(this);
        }
    }

    static getGroup(groupName:string):Phaser.Group {
        return Actor.groups[groupName];
    }

    static getGroupRawArr(groupName:string) {
        return Actor.groupsRawArr[groupName];
    }



}

/// <reference path="../../engine/phaser.d.ts"/>

class GroupsHolder {
    static groups={};
    static groupsRawArr={};
}

class Actor {
    sprite:Phaser.Sprite;
    game:Phaser.Game;

    constructor(posX:number,posY:number,spriteName:string,game:Phaser.Game,groupName?:string) {
        this.game = game;
        this.sprite = game.add.sprite(posX,posY,spriteName);
        game.physics.arcade.enable(this.sprite);
        game.physics.enable(this.sprite,Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.gravity.y = 0;
        if (groupName) {
            if (!GroupsHolder.groups[groupName]) {
                GroupsHolder.groups[groupName] = game.add.group();
            }
            GroupsHolder.groups[groupName].add(this.sprite);
            if (!GroupsHolder.groupsRawArr[groupName]) GroupsHolder.groupsRawArr[groupName] = [];
            GroupsHolder.groupsRawArr[groupName].push(this);
        }
    }

    static getGroup(groupName:string):Phaser.Group {
        return GroupsHolder.groups[groupName] || [];
    }

    static getGroupRawArr(groupName:string):Actor[] {
        return GroupsHolder.groupsRawArr[groupName] || [];
    }

    static clear():void {
        GroupsHolder.groups = {};
        GroupsHolder.groupsRawArr = {};
    }


}

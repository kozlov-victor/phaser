/// <reference path="../engine/phaser.d.ts"/>
/// <reference path="../levels/BaseLevel.ts"/>

class Level1 extends BaseLevel {

    create():void {
        this.initLevel({
            heroPosX:64,
            heroPosY:564,
            levelMap:'mapLevel1',
            levelBgSound:'bgSound'
        });
        console.log('%c level1 ok','color: green;font-weight:bolder;font-size:24px;');
    }

    update():void {
        super.update();
    }

}

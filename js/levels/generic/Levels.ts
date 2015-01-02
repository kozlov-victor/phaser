/// <reference path="../../engine/phaser.d.ts"/>
/// <reference path="../BaseLevel.ts"/>

class Level1 extends BaseLevel {

    create():void {
        this.initLevel({
            heroPosX:12,
            heroPosY:64,
            levelMap:'mapLevel1',
            levelBgSound:'bgSound'
        });
        console.log('%c level1 ok','color: green;font-weight:bolder;font-size:24px;');
    }

    update():void {
        super.update();
    }

}

class Level2 extends BaseLevel {

    create():void {
        this.initLevel({
            heroPosX:12,
            heroPosY:64,
            levelMap:'mapLevel2',
            levelBgSound:'bgSound'
        });
        console.log('%c level2 ok','color: green;font-weight:bolder;font-size:24px;');
    }

    update():void {
        super.update();
    }

}


class Level3 extends BaseLevel {

    create():void {
        this.initLevel({
            heroPosX:12,
            heroPosY:64,
            levelMap:'mapLevel3',
            levelBgSound:'bgSound'
        });
        console.log('%c level3 ok','color: green;font-weight:bolder;font-size:24px;');
    }

    update():void {
        super.update();
    }

}


///<reference path="BaseLevel.ts"/>

class NextLevelManager {
    private levels:BaseLevel[] = [];
    private currentLevelNumber = 0;
    private instanceCrested:boolean = false;
    private instance:NextLevelManager = null;

    constructor() {
        if (this.instanceCrested) throw new Error('use getInstance instead of constructor');
        this.instanceCrested = true;
    }

    public getInstance():NextLevelManager {
        if (!this.instance) this.instance = new NextLevelManager();
        return this.instance;
    }

    public addLevel(level:BaseLevel):void {
        this.levels.push(level);
    }

    public getFirst():BaseLevel {
        return this.levels[0];
    }

    public getNext():BaseLevel {
        this.currentLevelNumber++;
        return this.levels[this.currentLevelNumber];
    }

    public isLast():boolean {
        return this.levels.length-1==this.currentLevelNumber;
    }


}

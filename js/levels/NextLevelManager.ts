///<reference path="BaseLevel.ts"/>

class NextLevelManager {
    private levels:BaseLevel[] = [];
    private currentLevelNumber = 0;
    private instanceCrested:boolean = false;
    private static instance:NextLevelManager = null;

    constructor() {
        if (this.instanceCrested) throw new Error('use getInstance instead of constructor');
        this.instanceCrested = true;
    }

    public static getInstance():NextLevelManager {
        if (!NextLevelManager.instance) NextLevelManager.instance = new NextLevelManager();
        return NextLevelManager.instance;
    }

    public addLevel(level:BaseLevel):NextLevelManager {
        this.levels.push(level);
        return NextLevelManager.instance;
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

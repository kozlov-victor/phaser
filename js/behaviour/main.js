///<reference path="../engine/phaser.d.ts"/>
var FireBehaviour = (function () {
    function FireBehaviour(game, timeToFire) {
        this.lastFiredTime = 0;
        this.timeToFire = 500;
        this.game = game;
        this.bulletGroup = this.game.add.group();
        this.bulletGroup.enableBody = true;
        this.bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.bulletGroup.createMultiple(100, 'imgParticle');
        this.bulletGroup.setAll('outOfBoundsKill', true);
        this.bulletGroup.setAll('checkWorldBounds', true);
        this.timeToFire = timeToFire;
    }
    FireBehaviour.prototype.fire = function () {
        var now = this.game.time.now;
        if (now - this.lastFiredTime > this.timeToFire) {
            this.lastFiredTime = now;
            return this.bulletGroup.getFirstExists(false);
        }
        return null;
    };
    FireBehaviour.prototype.getBullets = function () {
        return this.bulletGroup;
    };
    return FireBehaviour;
})();
//# sourceMappingURL=main.js.map
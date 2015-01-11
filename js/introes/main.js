/// <reference path="../engine/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LevelPassed = (function (_super) {
    __extends(LevelPassed, _super);
    function LevelPassed() {
        _super.apply(this, arguments);
    }
    LevelPassed.prototype.create = function () {
        console.log('level passed');
    };
    LevelPassed.prototype.update = function () {
    };
    return LevelPassed;
})(Phaser.State);
//# sourceMappingURL=main.js.map
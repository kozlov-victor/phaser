/// <reference path="../engine/phaser.d.ts"/>
var TileMapUtil = (function () {
    function TileMapUtil() {
    }
    TileMapUtil.prototype.createMap = function (levelMapResourceName, tileSetInTiledName, imgTilesResourceName, layerInTiledName, objectInTiledLayerName, collisions, game) {
        this.objectLayerName = objectInTiledLayerName;
        this.tileMap = game.add.tilemap(levelMapResourceName, 32, 32, 20, 20);
        this.tileMap.addTilesetImage(tileSetInTiledName, imgTilesResourceName);
        this.mainLayer = this.tileMap.createLayer(layerInTiledName);
        this.mainLayer.resizeWorld();
        this.tileMap.setCollision(collisions, true, layerInTiledName);
        //this.mainLayer.debug = true;
    };
    TileMapUtil.prototype.getMapObjects = function () {
        return this.tileMap[this.objectLayerName];
    };
    TileMapUtil.prototype.getMainLayer = function () {
        return this.mainLayer;
    };
    return TileMapUtil;
})();
//# sourceMappingURL=main.js.map
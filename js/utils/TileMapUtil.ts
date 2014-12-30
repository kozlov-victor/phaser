/// <reference path="../engine/phaser.d.ts"/>

class TileMapUtil {

    private mainLayer:Phaser.TilemapLayer;
    private tileMap:Phaser.Tilemap;
    private objectLayerName:string;
    private game:Phaser.Game;

    constructor(game:Phaser.Game) {
        this.game = game;
    }

    createMap(
                levelMapResourceName:string,
                tileSetInTiledName:string,
                imgTilesResourceName:string,
                mainLayerInTiledName:string,
                objectLayerInTiledName:string,
                collisions:number[]
    ) {
        this.objectLayerName = objectLayerInTiledName;
        this.tileMap = this.game.add.tilemap(levelMapResourceName);
        this.tileMap.addTilesetImage(tileSetInTiledName,imgTilesResourceName);
        this.mainLayer  = this.tileMap.createLayer(mainLayerInTiledName);
        this.mainLayer.resizeWorld();
        this.tileMap.setCollision(collisions,true,mainLayerInTiledName);
        //this.mainLayer.debug = true;
    }

    getMapObjects() {
        return this.tileMap.objects[this.objectLayerName];
    }

    getMainLayer() {
        return this.mainLayer;
    }

}

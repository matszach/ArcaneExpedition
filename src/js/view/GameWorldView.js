const Mx = require("../lib/mx");
const { scaleAndCenterLayers } = require("../util/viewsUtil");
const VersionInfo = require("./gui/misc/VersionInfo");
const Cursor = require("./gui/misc/Cursor");
const SheetManager = require("../service/SheetManager");

module.exports = class GameWordlView extends Mx.View {

    onCreate() {
        const map = this.game.state.gameState.worldmap;
        const mapContainer = Mx.Container.create();
        map.fields.forEach((f, x, y) => {
            const fieldSprite = SheetManager.mapfields.get(Math.floor(Math.random() * 9), 0);
            fieldSprite.setDrawnSize(32, 32);
            fieldSprite.place(x * 34, y * 34);
            f.spriteRef = fieldSprite;
            fieldSprite.on('up', () => {
                console.log(x, y);
            }).on('over', () => {
                fieldSprite.scale(1.1);
            }).on('out', () => {
                fieldSprite.scale(1/1.1);
            });
            mapContainer.add(fieldSprite);
        });
        map.spriteContainerRef = mapContainer;
        mapContainer.centerOn(0, 0)
        this.mapLayer = Mx.Layer.create({ vpX: 0, vpY: 0, vpScale: 1, entities: [mapContainer] });
    }

    onResize() {
        scaleAndCenterLayers(this.handler, this.mapLayer);
    }

    onUpdate() {
        this.handler.clear();
        this.handler.handleLayers(this.mapLayer)
        VersionInfo.handle(this.handler);
        Cursor.draw(this.handler, this.input);
    }

}


// this.mapLayer.setViewportPosition(200, 200);
// mapContainer.move(-100, -100);
// this.mapLayer.moveViewport(1, 1)
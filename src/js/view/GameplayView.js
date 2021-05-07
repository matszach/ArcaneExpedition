const Mx = require("../lib/mx");
const { scaleAndCenterLayers } = require("../util/viewsUtil");
const VersionInfo = require("./gui/misc/VersionInfo");
const Cursor = require("./gui/misc/Cursor");
const SheetManager = require("../service/SheetManager");

module.exports = class GameplayView extends Mx.View {

    onCreate() {
        const map = this.game.state.gameState.worldmap;
        const mapContainer = Mx.Container.create();
        map.fields.forEach((f, x, y) => {
            const fieldSprite = SheetManager.mapfields.get(Math.floor(Math.random() * 8), 0);
            fieldSprite.setDrawnSize(32, 32);
            fieldSprite.place(x * 34, y * 34);
            f.spriteRef = fieldSprite;
            mapContainer.add(fieldSprite);
        });
        map.spriteContainerRef = mapContainer;
        this.mapLayer = Mx.Layer.create({ vpX: 0, vpY: 0, vpScale: 1, entities: [mapContainer] });
        this.mapLayer.setViewportPosition(200, 200);
        // mapContainer.move(-100, -100);
    }

    onResize() {
        // scaleAndCenterLayers(this.handler, this.mapLayer);
    }

    onUpdate() {
        this.mapLayer.moveViewport(1, 1);
        this.handler.clear();
        this.handler.handleLayers(this.mapLayer)
        VersionInfo.handle(this.handler);
        Cursor.draw(this.handler, this.input);
    }

}
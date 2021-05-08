const Mx = require("../lib/mx");
const SheetManager = require("../service/SheetManager");
const { scaleAndCenterLayers, genericMenuViewUpdate } = require("../util/viewsUtil");

module.exports = class GameWordlView extends Mx.View {

    onCreate() {
        this.worldMap = this.game.state.gameState.worldmap;
        this.mapLayer = this.buildMapLayer();
    }

    onResize() {
        scaleAndCenterLayers(this.handler, this.mapLayer);
    }

    onUpdate() {
        genericMenuViewUpdate(this.handler, this.input, this.mapLayer)
    }
    
    // create
    buildMapLayer() {
        const mapContainer = Mx.Container.create();
        this.worldMap.fields.forEach((f, x, y) => {
            const fieldSprite = SheetManager.mapfields.get(f.spriteX, f.spriteY);
            fieldSprite.setDrawnSize(32, 32);
            fieldSprite.place(x * 34, y * 34);
            f.spriteRef = fieldSprite;
            fieldSprite.on('down', () => {
                fieldSprite.scale(0.9);
            }).on('up', () => {
                fieldSprite.scale(1/0.9);
                console.log(x, y); // TODO on field clicked here
            }).on('over', () => {
                fieldSprite.scale(1.05);
            }).on('out', () => {
                fieldSprite.scale(1/1.05);
            });
            mapContainer.add(fieldSprite);
        });
        this.worldMap.spriteContainerRef = mapContainer;
        mapContainer.centerOn(0, 0)
        return Mx.Layer.create({ vpX: 0, vpY: 0, vpScale: 1, entities: [mapContainer] });
    }
}

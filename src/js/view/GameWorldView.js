const Mx = require("../lib/mx");
const SheetManager = require("../service/SheetManager");
const { scaleAndCenterLayers, genericMenuViewUpdate, scaleAndAlignLayersToLeftTop } = require("../util/viewsUtil");
const InnerWindowBackgroundComponent = require("./gui/components/InnerWindowBackgroundComponent");
const MenuButtonComponent = require("./gui/components/MenuButtonComponent");

module.exports = class GameWordlView extends Mx.View {

    onCreate() {
        this.worldMap = this.game.state.gameState.worldmap;
        this.mapLayer = this.buildMapLayer();
        this.guiLayer = this.buildGuiLayer();
        this.optionsLayer = this.buildOptionsLayer();
        this.optionsLayer.hide();
    }

    onResize() {
        scaleAndCenterLayers(this.handler, this.mapLayer, this.optionsLayer);
        scaleAndAlignLayersToLeftTop(this.handler, this.guiLayer);
    }

    onUpdate() {
        genericMenuViewUpdate(this.handler, this.input, 0.3, this.mapLayer, this.guiLayer, this.optionsLayer);
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
        return Mx.Layer.create({ entities: [mapContainer] });
    }

    buildGuiLayer() {
        this.partyButton = new MenuButtonComponent('', 'Party', () => {});
        this.partyButton.place(36, 40);
        this.optionsButton = new MenuButtonComponent('', 'Options', () => this.optionsLayer.show());
        this.optionsButton.place(36, 108);
        return Mx.Layer.create({ entities: [this.partyButton, this.optionsButton] });
    }

    buildOptionsLayer() {
        const background = new InnerWindowBackgroundComponent(4, 3);
        return Mx.Layer.create({ entities: [background] });   
    }

}

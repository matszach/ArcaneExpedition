const Mx = require("../lib/mx");
const SheetManager = require("../service/SheetManager");
const { scaleAndCenterLayers, genericMenuViewUpdate, scaleAndAlignLayersToLeftTop } = require("../util/viewsUtil");
const BootView = require("./BootView");
const ActiveText = require("./gui/components/ActiveText");
const InnerWindowBackgroundComponent = require("./gui/components/InnerWindowBackgroundComponent");
const MenuButtonComponent = require("./gui/components/MenuButtonComponent");

module.exports = class GameWordlView extends Mx.View {

    onCreate() {
        this.worldMap = this.game.state.gameState.worldmap;
        this.mapLayer = this.buildMapLayer();
        this.guiLayer = this.buildGuiLayer();
        this.partyLayer = this.buildPartyLayer().hide();
        this.optionsLayer = this.buildOptionsLayer().hide();
        this.exitLayer = this.buildExitMenuLayer().hide();
    }

    onResize() {
        scaleAndCenterLayers(
            this.handler, this.mapLayer, 
            this.partyLayer, this.optionsLayer, this.exitLayer
        );
        scaleAndAlignLayersToLeftTop(this.handler, this.guiLayer);
    }

    onUpdate() {
        genericMenuViewUpdate(
            this.handler, this.input, 0.3, 
            this.mapLayer, this.guiLayer, this.partyLayer, this.optionsLayer, this.exitLayer
        );
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
        this.partyButton = new MenuButtonComponent('', 'Party', () => this.toggleSubViewLayer('party'), false);
        this.partyButton.place(36, 40);
        this.optionsButton = new MenuButtonComponent('', 'Options', () => this.toggleSubViewLayer('options'), false);
        this.optionsButton.place(36, 108);
        this.exitButton = new MenuButtonComponent('', 'Exit', () => this.toggleSubViewLayer('exit'), false);
        this.exitButton.place(36, 176);
        return Mx.Layer.create({ entities: [this.partyButton, this.optionsButton, this.exitButton] });
    }

    toggleSubViewLayer(key) {
        const targetLayer = this[key + 'Layer'];
        const wasHidden = targetLayer.hidden;
        this.partyLayer.hide();
        this.optionsLayer.hide();
        this.exitLayer.hide(); 
        targetLayer.hidden = !wasHidden;
    }

    buildPartyLayer() {
        const background = new InnerWindowBackgroundComponent(9, 7);
        return Mx.Layer.create({ entities: [background] });   
    }

    buildOptionsLayer() {
        const background = new InnerWindowBackgroundComponent(4, 7);
        return Mx.Layer.create({ entities: [background] });   
    }

    buildExitMenuLayer() {
        const background = new InnerWindowBackgroundComponent(5, 3);
        const message = Mx.Text.create(0, -30, 'Exit to menu?', '#ffffff', 40, 'pixel', 0, 1, 'center');
        const confirm = ActiveText.create(-80, 50, 'OK', '#ffffff', 40, 'pixel', 0, 1, 'center').setAction(() => {
            this.game.toView(BootView)
        })
        const cancel = ActiveText.create(80, 50, 'Cancel', '#ffffff', 40, 'pixel', 0, 1, 'center').setAction(() => {
            this.toggleSubViewLayer('exit')
        })
        return Mx.Layer.create({ entities: [background, message, confirm, cancel] });   
    }

}

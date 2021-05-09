const Mx = require("../lib/mx");
const SheetManager = require("../service/SheetManager");
const { scaleAndCenterLayers, genericMenuViewUpdate, scaleAndAlignLayersToLeftTop } = require("../util/viewsUtil");
const BootView = require("./BootView");
const ActiveText = require("./gui/components/ActiveText");
const InnerWindowBackgroundComponent = require("./gui/components/InnerWindowBackgroundComponent");
const MenuButtonComponent = require("./gui/components/MenuButtonComponent");
const Cursor = require("./gui/misc/Cursor");

module.exports = class GameWordlView extends Mx.View {

    onCreate() {
        // view setup
        this.worldMap = this.game.state.gameState.worldmap;
        this.party = this.game.state.gameState.party;
        this.mapLayer = this.buildMapLayer();
        this.guiLayer = this.buildGuiLayer();
        this.exitLayer = this.buildExitMenuLayer().hide();
        this.partyLayer = this.buildPartyLayer().hide();
        this.optionsLayer = this.buildOptionsLayer().hide();
        this.eventLayer = this.buildDefaultEventLayer().hide();
        // adapting to state (prevents exploit that would allow to skip event by exiting to the menu)
        if(this.getCurrentField().visited) {
            this.revealAreaAroundPartyLocation();
        } else {
            this.openEvent();
        }
    }

    onResize() {
        scaleAndCenterLayers(
            this.handler, this.mapLayer, 
            this.partyLayer, this.optionsLayer, this.exitLayer, this.eventLayer
        );
        scaleAndAlignLayersToLeftTop(this.handler, this.guiLayer);
    }

    onUpdate() {
        genericMenuViewUpdate(
            this.handler, this.input, 0.3, 
            this.mapLayer, this.guiLayer, 
            this.partyLayer, this.optionsLayer, this.exitLayer, this.eventLayer
        );
        this.handler.displayDebugInfo(this.loop, 'red');
    }
    
    // create
    buildMapLayer() {
        const mapContainer = Mx.Container.create();
        // over map hover text
        const hoverTextPosition = this.worldMap.fields.xSize * 34 / 2;
        const hoverText = Mx.Text.create(hoverTextPosition, -30, '', '#ffffff', 20, 'pixel', 0, 1, 'center');
        mapContainer.add(hoverText);
        // map fields
        this.worldMap.fields.forEach((f, x, y) => {
            const fieldSprite = SheetManager.mapfields.get(f.spriteX, f.spriteY);
            fieldSprite.setDrawnSize(32, 32);
            fieldSprite.place(x * 34, y * 34);
            fieldSprite.on('over', () => hoverText.content = f.getTooltip());
            fieldSprite.on('out', () => hoverText.content = '');
            f.spriteRef = fieldSprite;
            mapContainer.add(fieldSprite);
            if(!f.discovered) {
                f.hide();
            } else if(f.visited) {
                f.visit();
            }
        });
        // party markers
        const {x: px, y: py} = this.party.position;
        const pmCenter = this.getMapMarkerSprite(0, 0, px, py);
        const pmRight = this.getMapMarkerSprite(1, 0, px + 1, py, 0, true, 1, 0);
        const pmLeft = this.getMapMarkerSprite(1, 0, px - 1, py, Math.PI, true, -1, 0);
        const pmUp = this.getMapMarkerSprite(1, 0, px, py - 1, Math.PI * -0.5, true, 0, -1);
        const pmDown = this.getMapMarkerSprite(1, 0, px, py + 1, Math.PI * 0.5, true, 0, +1);
        const pmContainer = Mx.Container.of([pmCenter, pmRight, pmLeft, pmUp, pmDown]);
        this.party.guiRefs = {pmCenter, pmRight, pmLeft, pmUp, pmDown, pmContainer};
        mapContainer.add(pmContainer);
        // finalisation
        this.worldMap.spriteContainerRef = mapContainer;
        mapContainer.centerOn(0, 0);
        return Mx.Layer.create({ entities: [mapContainer] });
    }

    getMapMarkerSprite(spriteX, spriteY, posX, posY, rotation = 0, isArrow = false, dirX = undefined, dirY = undefined) {
        const sprite = SheetManager.mapMarkers.get(spriteX, spriteY);
        sprite.setDrawnSize(32, 32);
        sprite.place(posX * 34, posY * 34);
        sprite.setRotation(rotation);
        if(isArrow) {
            sprite.on('over', () => {
                sprite.setFrame(2, 0);
                Cursor.key = 'pointer';
            }).on('out', () => {
                sprite.setFrame(1, 0);
                Cursor.key = 'key';
            }).on('down', () => {
                sprite.scale(0.9);
            }).on('up', () => {
                sprite.scale(1/0.9);
                sprite.setFrame(1, 0);
                Cursor.key = 'key';
                this.partyMovement(dirX, dirY);
            });
        }
        return sprite;
    }

    buildGuiLayer() {
        this.exitButton = new MenuButtonComponent('', 'Exit', () => this.toggleSubViewLayer('exit'), true);
        this.exitButton.place(36, 40);
        this.partyButton = new MenuButtonComponent('', 'Party', () => this.toggleSubViewLayer('party'), true);
        this.partyButton.place(36, 108);
        this.optionsButton = new MenuButtonComponent('', 'Options', () => this.toggleSubViewLayer('options'), true);
        this.optionsButton.place(36, 176);
        this.eventButton = new MenuButtonComponent('', 'Event', () => this.toggleSubViewLayer('event'), true);
        this.eventButton.place(36, 244).disable();
        return Mx.Layer.create({ entities: [this.exitButton, this.partyButton, this.optionsButton, this.eventButton] });
    }

    toggleSubViewLayer(key) {
        const targetLayer = this[key + 'Layer'];
        const wasHidden = targetLayer.hidden;
        this.exitLayer.hide(); 
        this.partyLayer.hide();
        this.optionsLayer.hide();
        this.eventLayer.hide();
        targetLayer.hidden = !wasHidden;
        if(targetLayer.hidden) {
            if(!this.getCurrentField().visited) { // reopens event layer if unresolved
                this.eventLayer.show();
            }
            this.mapLayer.unmute();
        } else {
            this.mapLayer.mute();
        }
    }

    buildExitMenuLayer() {
        const background = new InnerWindowBackgroundComponent(5, 3);
        const message = Mx.Text.create(0, -30, 'Exit to menu?', '#ffffff', 40, 'pixel', 0, 1, 'center');
        const confirm = ActiveText.create(-80, 50, 'OK', '#ffffff', 40, 'pixel', 0, 1, 'center');
        confirm.setAction(() => this.game.toView(BootView));
        const cancel = ActiveText.create(60, 50, 'Cancel', '#ffffff', 40, 'pixel', 0, 1, 'center');
        cancel.setAction(() => this.toggleSubViewLayer('exit'));
        return Mx.Layer.create({ entities: [background, message, confirm, cancel] });   
    }

    buildPartyLayer() {
        const background = new InnerWindowBackgroundComponent(10, 7);
        return Mx.Layer.create({ entities: [background] });   
    }

    buildOptionsLayer() {
        const background = new InnerWindowBackgroundComponent(4, 7);
        return Mx.Layer.create({ entities: [background] });   
    }

    buildDefaultEventLayer() {
        // new should be build for every event, this is just a default layer
        const background = new InnerWindowBackgroundComponent(4, 7);
        return Mx.Layer.create({ entities: [background] });   
    }

    setupEventLayerForEvent(event) {
        // TODO external logic to build this view by event
        this.eventLayer.empty();
        const background = new InnerWindowBackgroundComponent(8, 7);
        const resolve = ActiveText.create(-80, 50, 'TEST_resolve', '#ffffff', 40, 'pixel', 0, 1, 'center');
        resolve.setAction(() => this.resolveEvent());
        this.eventLayer.adds([background, resolve]);
    }


    // gameplay logic
    getCurrentField() {
        return this.worldMap.fields.get(this.party.position.x, this.party.position.y);
    }


    partyMovement(dx, dy) {
        this.party.travel(dx, dy, this.worldMap);
        const field = this.getCurrentField();
        if(field.visited) {
            this.revealAreaAroundPartyLocation(); 
        } else {
            this.openEvent();
        }
    }

    revealAreaAroundPartyLocation() {
        const {x: px, y: py} = this.party.position;
        const range = this.getCurrentField().revealRange;
        this.worldMap.fields.forEach((field, x, y) => {
            if(Mx.Geo.Distance.simple(x, y, px, py) <= range) {
                field.show();
            }
        });
    }

    // fired when first entering a new field, shoudl disable party button until resolved
    openEvent() {
        const field = this.getCurrentField();
        const event = field.getEvent();
        this.setupEventLayerForEvent(event);
        this.eventLayer.show();
        this.eventButton.enable();
        this.partyButton.disable();
        this.mapLayer.mute();
    }

    resolveEvent() {
        const field = this.getCurrentField();
        field.visit();
        this.revealAreaAroundPartyLocation(); 
        this.eventLayer.hide();
        this.eventButton.disable();
        this.partyButton.enable();
        this.mapLayer.unmute();
    }

}

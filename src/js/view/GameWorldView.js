const Mx = require("../lib/mx");
const { scaleAndCenterLayers, genericMenuViewUpdate } = require("../util/viewsUtil");
const buildMapLayer = require("./subview/buildMapLayer");

module.exports = class GameWordlView extends Mx.View {

    onCreate() {
        this.worldMap = this.game.state.gameState.worldmap;
        this.mapLayer = buildMapLayer(this);
    }

    onResize() {
        scaleAndCenterLayers(this.handler, this.mapLayer);
    }

    onUpdate() {
        genericMenuViewUpdate(this.handler, this.input, this.mapLayer)
    }

}

const Cursor = require("../view/gui/misc/Cursor");
const MenuBackgroundAnimation = require("../view/gui/misc/MenuBackgroundAnimation");
const VersionInfo = require("../view/gui/misc/VersionInfo");

module.exports = {

    scaleAndCenterLayer(layer, handler) {
        const {width, height} = handler.canvas;
        const scale = Math.min(width/800, height/600);
        layer.setViewportPosition(width/2, height/2);
        layer.setViewportScale(scale);
    },
    
    genericMenuViewUpdate(handler, input, ...layers) {
        handler.clear();
        MenuBackgroundAnimation.handle(handler, input);
        handler.handleLayers(...layers);
        VersionInfo.handle(handler);
        Cursor.draw(handler, input);
    },

    cullExpired(loop, frame, view, ...layers) {
        if(loop.tickCounter % frame === 0) {
            for(let layer of layers) {
                view[layer] = view[layer].filter(e => !e.expired);
            }
        }
    }

}
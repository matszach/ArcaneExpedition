const Cursor = require("../view/gui/misc/Cursor");
const MenuBackgroundAnimation = require("../view/gui/misc/MenuBackgroundAnimation");
const VersionInfo = require("../view/gui/misc/VersionInfo");

module.exports = {


    scaleAndCenterLayers(handler, ...layers) {
        const {width, height} = handler.canvas;
        const scale = Math.min(width/800, height/600);
        for(let layer of layers) {
            layer.setViewportPosition(width/2, height/2);
            layer.setViewportScale(scale);
        }
    },

    scaleAndAlignLayersToLeftTop(handler, ...layers) {
        const {width, height} = handler.canvas;
        const scale = Math.min(width/800, height/600);
        for(let layer of layers) {
            layer.setViewportScale(scale);
        }
    },
    
    genericMenuViewUpdate(handler, input, backgroundAlpha, ...layers) {
        handler.clear();
        MenuBackgroundAnimation.handle(handler, input, backgroundAlpha);
        handler.handleLayers(...layers);
        VersionInfo.handle(handler);
        Cursor.draw(handler, input);
    },
}
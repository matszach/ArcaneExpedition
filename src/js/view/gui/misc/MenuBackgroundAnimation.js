const Mx = require("../../../lib/mx");
const SheetManager = require("./../../../service/SheetManager");

module.exports = class MenuBackgroundAnimation {

    static rng = Mx.Rng.create();

    static handle(handler, input, alpha = 1) {
        const spriteSize = 48 * 4;
        const {width, height} = handler.canvas;
        const widthInTiles = Math.ceil(width / spriteSize) + 1;
        const heightInTiles = Math.ceil(height / spriteSize) + 1;
        const offsetX = (widthInTiles * spriteSize - width) / 2; 
        const offsetY = (heightInTiles * spriteSize - height) / 2; 
        for(let x = 0; x < widthInTiles; x++) {
            for(let y = 0; y < heightInTiles; y++) {
                const state = 2 * x + y + x * (y + 2); 
                MenuBackgroundAnimation.rng.setState(state);
                const sprite = SheetManager.backgroundTiles.get(MenuBackgroundAnimation.rng.int(0, 6), 0);
                sprite.place(- offsetX + x * spriteSize, - offsetY + y * spriteSize).setAlpha(alpha);
                handler.draw(sprite);
            }
        }

    }

}
const Mx = require("../../../lib/mx");
const SheetManager = require("../../../service/SheetManager");

module.exports = class SpeechBubbleEntity extends Mx.Sprite {

    static forKey(key, x, y, duration) {
        // TODO
    }

    constructor(x, y, spriteX, spriteY, duration) {
        const sheet = SheetManager.speechbubble;
        super(
            sheet, x, y, sheet.img,
            sheet.spriteWidth, sheet.spriteHeight, sheet.borderThickness,
            spriteX, spriteY
        );
        this.durationLeft = duration;
    }

    update() {
        if(!this.expired) {
            this.durationLeft--;
            if(this.durationLeft < 0) {
                this.hide();
            }
        }   
    }

}


const Mx = require("../../../lib/mx");
const SheetManager = require("../../../service/SheetManager");

module.exports = class InnerWindowBackgroundComponent extends Mx.Gui.GuiComponent {

    constructor(width, height) {
        super(0, 0, {width, height});
    }

    construct() {
        this.spriteSize = 32 * 2;
        this.color = Mx.Draw.Color.rgba(20, 10, 0, 0.95);
        this.trueWidth = this.options.width * this.spriteSize;
        this.trueHeight = this.options.height * this.spriteSize;
        this.makeBackground();
        for(let x = 1; x < this.options.width; x++) {
            this.makeBorderSprite(x, 0, 1, 0);
            this.makeBorderSprite(x, this.options.height, 1, 0);
        }
        for(let y = 1; y < this.options.height; y++) {
            this.makeBorderSprite(0, y, 0, 0);
            this.makeBorderSprite(this.options.width, y, 0, 0);
        }
        this.makeBorderSprite(0, 0, 2, 0);
        this.makeBorderSprite(0, this.options.height, 5, 0);
        this.makeBorderSprite(this.options.width, 0, 3, 0);
        this.makeBorderSprite(this.options.width, this.options.height, 4, 0);
    }

    makeBackground() {
        this.bodyRect = Mx.Geo.Rectangle.create(
            -this.trueWidth/2, -this.trueHeight/2, 
            this.trueWidth, this.trueHeight, 
            this.color
        );
        this.container.add(this.bodyRect);
    }

    makeBorderSprite(x, y, sx, sy) {
        const sprite = SheetManager.windowBorder.get(sx, sy);
        const trueX = -this.trueWidth/2 + x * this.spriteSize;
        const trueY = -this.trueHeight/2 + y * this.spriteSize;
        sprite.place(trueX, trueY);
        sprite.setDrawnSize(this.spriteSize * 0.95, this.spriteSize * 0.95);
        const angle = (Math.random() - 0.5) * 0.1;
        sprite.rotate(angle);
        this.container.add(sprite);
    }

}
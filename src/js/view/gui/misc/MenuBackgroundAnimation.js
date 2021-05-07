const Mx = require("../../../lib/mx");

module.exports = class MenuBackgroundAnimation {

    static SIZE = 20;

    static handle(handler, input) {
        const {xInCanvas: mx, yInCanvas: my} = input.mouse();
        for(let x = 0; x < handler.canvas.width + 20; x += 1.5 * this.SIZE) {
            for(let y = 0; y < handler.canvas.height + 20; y += 1.5 * this.SIZE) {
                const dist = Mx.Geo.Distance.simple(x, y, mx, my);
                const alpha = 0.5 - dist / 2000;
                if(alpha > 0) {
                    const color = Mx.Draw.Color.rgba(100, 50, 0, alpha)
                    handler.fillRect(x - 0.5 * this.SIZE, y - 0.5 * this.SIZE, this.SIZE, this.SIZE, color);
                }
            }
        }
    }

}
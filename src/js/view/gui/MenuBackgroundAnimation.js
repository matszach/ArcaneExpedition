const Mx = require("../../lib/mx");

module.exports = class MenuBackgroundAnimation {

    static handle(handler, input) {
        const {xInCanvas: mx, yInCanvas: my} = input.mouse();
        for(let x = 0; x < handler.canvas.width; x += 30) {
            for(let y = 0; y < handler.canvas.height; y += 30) {
                const dist = Mx.Geo.Distance.simple(x, y, mx, my);
                const alpha = 0.5 - dist / 1000;
                if(alpha > 0) {
                    const color = Mx.Draw.Color.rgba(100, 50, 0, alpha)
                    handler.fillRect(x - 10, y - 10, 20, 20, color);
                }
            }
        }
    }

}
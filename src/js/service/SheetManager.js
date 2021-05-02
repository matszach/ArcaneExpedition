const Mx = require("../lib/mx")

module.exports = class SheetManager {
    static _loadss = (name, x, y) => Mx.SpriteSheet.create(`assets/img/${name}.png`, x, y, 1, 4)
    static button = this._loadss('button', 48, 16);
    static textinput = this._loadss('textinput', 80, 16);
    static cursor = this._loadss('cursor', 16, 16);
}
const Mx = require("../lib/mx")

module.exports = class SheetManager {
    static _load = (name, x, y) => Mx.SpriteSheet.create(`assets/img/${name}.png`, x, y, 1, 4)
    static button16 = this._load('button16x16', 16, 16);
    static button32 = this._load('button16x32', 32, 16);
    static button48 = this._load('button16x48', 48, 16);
    static button64 = this._load('button16x64', 64, 16);
    static textinput = this._load('textinput', 80, 16);
    static cursor = this._load('cursor', 16, 16);
    static characters = this._load('characters', 16, 16);
    static characterSelectBackground = this._load('characterSelectBackground', 24, 24);
}
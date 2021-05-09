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
    static buttonDice = this._load('buttonDice', 32, 16);
    static loadingBar = this._load('loadingBar', 64, 16);
    static speechbubble = this._load('speechbubble', 16, 16);
    static mapfields = this._load('mapfields', 16, 16);
    static buttonParty = this._load('buttonParty', 16, 16);
    static buttonOptions = this._load('buttonOptions', 16, 16);
    static backgroundTiles = this._load('backgroundTiles', 48, 48);
    static windowBorder = this._load('windowBorder', 32, 32);
    static buttonExit = this._load('buttonExit', 16, 16);
    static mapMarkers = this._load('mapMarkers', 16, 16);
    static buttonEvent = this._load('buttonEvent', 16, 16);
}
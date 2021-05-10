const Mx = require("../lib/mx")

module.exports = class Inventory {

    constructor() {
        this.items = new Mx.Ds.Array2D(8, 5);
        this.gold = 0;
    }

}
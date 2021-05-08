const Mx = require("../lib/mx");
const Inventory = require("./Inventory");

module.exports = class Party {

    constructor(members) {
        this.members = members;
        this.position = Mx.Geo.Vertex.create(0, 0);
        this.inventory = new Inventory();
    }

}
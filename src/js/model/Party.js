const Mx = require("../lib/mx");
const Inventory = require("./Inventory");

module.exports = class Party {

    constructor(members) {
        this.members = members;
        this.position = Mx.Geo.Vertex.create(0, 0);
        this.inventory = new Inventory();
        this.guiRefs = {};
    }

    travel(dirX, dirY, worldRef) {
        this.guiRefs.pmContainer.move(dirX * 34, dirY * 34);
        this.position.move(dirX, dirY);
        this.guiRefs.pmLeft.hidden = !(this.position.x > 0);
        this.guiRefs.pmRight.hidden = this.position.x >= worldRef.fields.xSize - 1;
        this.guiRefs.pmUp.hidden = !(this.position.y > 0);
        this.guiRefs.pmDown.hidden = this.position.y >= worldRef.fields.ySize - 1;
    }

}
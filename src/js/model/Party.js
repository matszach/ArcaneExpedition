const Inventory = require("./Inventory");

module.exports = class Party {

    constructor(members) {
        this.members = members;
        this.inventory = new Inventory();
    }

}
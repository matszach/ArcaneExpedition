const EventFactory = require("../factories/EventFactory");
const Mx = require("../lib/mx");

module.exports = class Field {

    constructor(x, y, typeId, eventSeed) {
        this.x = x;
        this.y = y;
        this.typeId = typeId;
        this.eventSeed = eventSeed;
        this.explored = false;
        this.visited = false;
        this.spriteRef = null;
    }

    getEvent() {
        const rng = Mx.Rng.create(this.eventSeed);
        const ef = new EventFactory(rng);
        return ef.create(x, y);
    }

} 
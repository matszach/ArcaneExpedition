const EventFactory = require("../factories/EventFactory");
const Mx = require("../lib/mx");

module.exports = class Field {

    constructor(x, y, typeId, spriteX, spriteY, eventSeed) {
        this.x = x;
        this.y = y;
        this.typeId = typeId;
        this.spriteX = spriteX;
        this.spriteY = spriteY;
        this.eventSeed = eventSeed;
        this.explored = false;
        this.visited = false;
        this.spriteRef = null;
    }

    getEvent() {
        const rng = Mx.Rng.create(this.eventSeed);
        const ef = new EventFactory(rng);
        return ef.create({
            x: this.x,
            y: this.y,
            typeId: this.typeId
        });
    }

} 
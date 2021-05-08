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
        this.discovered = false;
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

    hide() {
        this.discovered = false;
        this.spriteRef.setFrame(0, 0);
        return this;
    }

    show() {
        this.discovered = true;
        this.spriteRef.setFrame(this.spriteX, this.spriteY);
        return this;
    }

} 
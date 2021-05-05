module.exports = class Field {

    constructor(typeId, eventSeed) {
        this.typeId = typeId;
        this.eventSeed = eventSeed;
        this.visited = false;
    }

}
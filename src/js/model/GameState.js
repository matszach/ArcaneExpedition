module.exports = class GameState {

    constructor(worldmap, party) {
        this.worldmap = worldmap;
        this.party = party;
    }

    toJson() {
        return JSON.stringify(this);
    }

    static fromJson(json) {

    }

}
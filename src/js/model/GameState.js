module.exports = class GameState {

    constructor(worldmap, party) {
        this.worldmap = worldmap;
        this.party = party;
        this.flags = {

        };
    }

    toJson() {
        return JSON.stringify(this);
    }

    static fromJson(json) {

    }

}
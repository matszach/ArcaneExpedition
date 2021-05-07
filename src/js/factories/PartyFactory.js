const Party = require("../model/Party");
const CharacterFactory = require("./CharacterFactory");
const Factory = require("./Factory");

module.exports = class PartyFactory extends Factory {

    constructor(rng) {
        super(rng);
        this.characterFactory = new CharacterFactory(rng);
    }

    create(args) {
        const members = args.partyMembers.map(id => this.characterFactory.create(id));
        const party = new Party(members);
        return party;
    }

}
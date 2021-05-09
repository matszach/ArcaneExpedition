const Party = require("../model/Party");
const CharacterFactory = require("./CharacterFactory");
const Factory = require("./Factory");
const fieldTemplates = require("./../../assets/json/fields.json");
const Mx = require("../lib/mx");

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

    // chooses the place with the larges total distance to quest markers on the map and places the party there
    place(party, worldMap) {
        const questTemplate = fieldTemplates.find(f => f.key === 'QUEST');
        const questFields = [];
        worldMap.fields.forEach((v, x, y) => {
            if(v.typeId === questTemplate.id) {
                questFields.push([x, y]);
            }
        });
        let nTotalDistance = 0;
        let nx = 0;
        let ny = 0;
        worldMap.fields.forEach((v, x, y) => {
            if(x === 0 || y === 0 || x === worldMap.fields.xSize - 1 || y === worldMap.fields.ySize - 1) {
                return;
            }
            const distances = [];
            questFields.forEach(qf => {
                const dist = Mx.Geo.Distance.simple(x, y, ...qf);
                distances.push(dist);
            });
            const totalDist = distances.reduce((acc, curr) => acc + curr, 0);
            if(nTotalDistance < totalDist) {
                nTotalDistance = totalDist;
                nx = x;
                ny = y;
            }
        });
        party.position.place(nx, ny);
        // set initial field as visited
        const field = worldMap.fields.get(nx, ny);
        field.visited = true;
    }

}
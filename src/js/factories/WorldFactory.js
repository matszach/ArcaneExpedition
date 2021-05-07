const Mx = require("../lib/mx");
const WorldMap = require("../model/WorldMap");
const Factory = require("./Factory");
const FieldFactory = require("./FieldFactory");

module.exports = class WorldFactory extends Factory {

    constructor(rng) {
        super(rng);
        this.fieldFactory = new FieldFactory(rng);
    }

    create(args) {
        const world = new WorldMap(args.mode);
        const worldSideSize = 15 + 2 * args.mode;
        world.fields = new Mx.Ds.Array2D(worldSideSize, worldSideSize);
        world.fields.map((v, x, y) => this.fieldFactory.create({x, y}));
        return world;
    }

}
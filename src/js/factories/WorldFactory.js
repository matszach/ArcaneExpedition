const Mx = require("../lib/mx");
const WorldMap = require("../model/WorldMap");
const { spacedOutPoints } = require("../util/random");
const Factory = require("./Factory");
const FieldFactory = require("./FieldFactory");
const fieldTemplates = require("./../../assets/json/fields.json");


module.exports = class WorldFactory extends Factory {

    constructor(rng) {
        super(rng);
        this.fieldFactory = new FieldFactory(rng);
    }

    create(args) {
        // base 
        const world = new WorldMap(args.mode);
        const worldWidth = 16 + 1 * args.mode;
        const worldHeight = 13 + 1 * args.mode;
        world.fields = new Mx.Ds.Array2D(worldWidth, worldHeight);
        world.fields.map((v, x, y) => this.fieldFactory.create({x, y}));
        // shops
        const shopsPoints = spacedOutPoints(this.rng, 0, 0, worldWidth, worldHeight, this.rng.int(4, 7), 3);
        const shopTemplate = fieldTemplates.find(f => f.key === 'SHOP');
        for(let [sx, sy] of shopsPoints) {
            world.fields.put(sx, sy, this.fieldFactory.create({x: sx, y: sy, template: shopTemplate}));
        }
        // quests
        const questPoints = spacedOutPoints(this.rng, 0, 0, worldWidth, worldHeight, 3, 6);
        const questTemplate = fieldTemplates.find(f => f.key === 'QUEST');
        for(let [qx, qy] of questPoints) {
            world.fields.put(qx, qy, this.fieldFactory.create({x: qx, y: qy, template: questTemplate}));
        }
        // fin
        return world;
    }


}
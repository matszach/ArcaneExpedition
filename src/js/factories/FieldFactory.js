const Field = require("../model/Field");
const Factory = require("./Factory");
const { seed } = require("./../util/random");
const fieldTemplates = require("./../../assets/json/fields.json");

module.exports = class FieldFactory extends Factory {

    create(args) {
        const template = args.template || this.rng.weightedPick(fieldTemplates, fieldTemplates.map(f => f.rarity));
        return new Field(
            args.x, 
            args.y,
            template.id,
            template.name,
            template.spriteX,
            template.spriteY,
            template.revealRange,
            seed(this.rng)
        );
    }

}
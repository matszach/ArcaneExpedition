const Field = require("../model/Field");
const Factory = require("./Factory");
const { seed } = require("./../util/random");

module.exports = class FieldFactory extends Factory {

    create(args) {
        return new Field(
            args.x, 
            args.y,
            null, // TODO
            seed(this.rng)
        );
    }

}
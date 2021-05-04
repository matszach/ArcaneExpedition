const Mx = require("../lib/mx");

module.exports = class CharacterJumpJiggleAnimation extends Mx.Animations.Sequence {

    constructor() {
        super(
            Mx.Animations.Move.create(0, -15, 2), 
            Mx.Animations.Move.create(0, -15, 4), 
            Mx.Animations.Move.create(0, 15, 4), 
            Mx.Animations.Move.create(0, 15, 2) 
        );
    }

}
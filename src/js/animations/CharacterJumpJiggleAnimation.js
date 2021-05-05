const Mx = require("../lib/mx");

module.exports = class CharacterJumpJiggleAnimation extends Mx.Animations.Sequence {

    constructor(height = 15) {
        super(
            Mx.Animations.Move.create(0, -height, 2), 
            Mx.Animations.Move.create(0, -height, 4), 
            Mx.Animations.Move.create(0, height, 4), 
            Mx.Animations.Move.create(0, height, 2) 
        );
    }

}
const PartyFactory = require("../factories/PartyFactory");
const WorldFactory = require("../factories/WorldFactory");
const Mx = require("../lib/mx");
const GameState = require("../model/GameState");

module.exports = class GameStateBuilder {

    constructor() {
        this.state = null;
        this.args = null;
        this.rng = null;
        this.completionState = 0;
        this.isFinished = false;
    }

    startFakeProgress() {
        const int = setInterval(() => {
            this.completionState += 0.1;
            if(this.completionState >= 1) {
                clearInterval(int);
            }
        }, 200);
    }

    build(args) {
        this.startFakeProgress();
        this.completionState = 0;
        this.isFinished = false;
        this.args = args;
        this.rng = Mx.Rng.create(this.args.seed);
        setTimeout(() => {
            const wf = new WorldFactory(this.rng);
            const world = wf.create(args);
            const pf = new PartyFactory(this.rng);
            const party = pf.create(args);
            pf.place(party, world);
            const state = new GameState(world, party);
            this.state = state
            this.isFinished = true;
        });
    }

}
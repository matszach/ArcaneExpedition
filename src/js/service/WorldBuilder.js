module.exports = class WorldBuilder {

    constructor() {
        this.world = null;
        this.completionState = 0;
        this.isFinished = false;
    }

    _TEST_mockProgress() {
        setInterval(() => {
            if(!this.isFinished) {
                this.completionState += Math.random()/10;
                if(this.completionState >= 1) {
                    this.isFinished = true;
                }
            }
        }, 500);
    }

    build(args) {
        this._TEST_mockProgress();
    }

}
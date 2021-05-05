const Mx = require("../lib/mx");
const WorldBuilder = require("./../service/WorldBuilder");
const SheetManager = require("../service/SheetManager");
const characterTemplates = require('./../../assets/json/characters.json');
const CharacterJumpJiggleAnimation = require('./../animations/CharacterJumpJiggleAnimation');
const { scaleAndCenterLayer, genericMenuViewUpdate } = require("../util/viewsUtil");

module.exports = class LoadingView extends Mx.View {

    onCreate() {
        this.rng = Mx.Rng.fromMathRandom();
        this.worldBuilder = new WorldBuilder();
        this.worldBuilder.build(this.game.state.newGameAttributes);
        this.avatars = this.createCharacterAvatars(this.game.state.newGameAttributes);
        this.avatars.forEach((a, i) => a.place(- 100 + 100 * i, - 50));
        this.loadingBar = SheetManager.loadingBar.get(0, 0);
        this.loadingBar.place(0, 50);
        this.guiLayer = Mx.Layer.create({ entities: [...this.avatars, this.loadingBar] });
    }

    onResize() {
        scaleAndCenterLayer(this.guiLayer, this.handler);
    }

    onUpdate() {
        this.handleAnimations();
        this.handleWorldBuilderStateChange();
        genericMenuViewUpdate(this.handler, this.input, this.guiLayer);
    }

    handleAnimations() {
        if(this.rng.chance(0.1)) {
            const animation = CharacterJumpJiggleAnimation.create(this.rng.int(5, 20));
            const avatar = this.rng.choice(this.avatars);
            if(avatar.animations.length === 0) {
                avatar.addAnimation(animation);
            } else if (this.rng.chance(0.5)) {
                avatar.flip();
            }
        }
    }  
    
    createCharacterAvatars(attr) {
        const ids = this.rng.shuffle(attr.partyMembers);
        return ids.map(id => {
            const template = characterTemplates.find(t => t.id === id);
            return SheetManager.characters.get(0, template.y);
        });
    }

    handleWorldBuilderStateChange() {
        if(!this.worldBuilder.isFinished) {
            const frame = Math.floor(this.worldBuilder.completionState * 14);
            this.loadingBar.setFrame(0, frame);
        }
    }   

}
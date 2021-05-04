const Mx = require("../lib/mx");
const VersionInfo = require("./gui/misc/VersionInfo");
const Cursor = require("./gui/misc/Cursor");
const WorldBuilder = require("./../service/WorldBuilder");
const SheetManager = require("../service/SheetManager");
const MenuBackgroundAnimation = require("./gui/misc/MenuBackgroundAnimation");
const characterTemplates = require('./../../assets/json/characters.json');
const CharacterJumpJiggleAnimation = require('./../animations/CharacterJumpJiggleAnimation');

module.exports = class LoadingView extends Mx.View {

    onCreate() {
        this.rng = Mx.Rng.fromMathRandom();
        this.worldBuilder = new WorldBuilder();
        this.worldBuilder.build(this.game.state.newGameAttributes);
        this.avatars = this.createCharacterAvatars(this.game.state.newGameAttributes);
        this.loadingBar = SheetManager.loadingBar.get(0, 0);
    }

    onResize() {
        const {width: vw, height: vh} = this.handler.canvas;
        this.loadingBar.place(vw/2, vh/2 + 50);
        this.avatars.forEach((a, i) => {
            a.clearAnimations();
            a.place(vw/2 - 100 + 100 * i, vh/2 - 50);
        });
    }

    onUpdate() {
        this.handleNewAnimations();
        this.handleWorldBuilderStateChange();
        this.handler.clear();
        MenuBackgroundAnimation.handle(this.handler, this.input);
        this.handler.handles([
            ...this.avatars, 
            this.loadingBar
        ]);
        VersionInfo.handle(this.handler);
        Cursor.draw(this.handler, this.input);
    }

    handleNewAnimations() {
        if(this.rng.chance(0.1)) {
            const animation = CharacterJumpJiggleAnimation.create();
            const avatar = this.rng.choice(this.avatars);
            if(avatar.animations.length === 0) {
                avatar.addAnimation(animation);
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
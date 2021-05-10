const Mx = require("../lib/mx");
const GameStateBuilder = require("../service/GameStateBuilder");
const SheetManager = require("../service/SheetManager");
const characterTemplates = require('./../../assets/json/characters.json');
const CharacterJumpJiggleAnimation = require('./../animations/CharacterJumpJiggleAnimation');
const { scaleAndCenterLayers, genericMenuViewUpdate } = require("../util/viewsUtil");
const MenuButtonComponent = require("./gui/components/MenuButtonComponent");
const SpeechBubbleEntity = require("./gui/game-entities/SpeechBubbleEntity");
const GameWorldView = require("./GameWorldView");

module.exports = class LoadingView extends Mx.View {

    onCreate() {
        this.rng = Mx.Rng.fromMathRandom();
        this.gsBuilder = new GameStateBuilder();
        this.gsBuilder.build(this.game.state.newGameAttributes);
        this.avatars = this.createCharacterAvatars(this.game.state.newGameAttributes);
        this.avatars.forEach((a, i) => a.place(- 100 + 100 * i, - 50));
        this.loadingBar = SheetManager.loadingBar.get(0, 0);
        this.loadingBar.place(0, 30);
        this.continueButton = new MenuButtonComponent('Continue', 48, () => this.toGameplay(), false).disable();
        this.continueButton.place(0, 120);
        this.guiLayer = Mx.Layer.create({ entities: [...this.avatars, this.loadingBar, this.continueButton] });
        this.particleLayer = Mx.Layer.create();
        this.loadingFinished = false;
    }

    onResize() {
        scaleAndCenterLayers(this.handler, this.guiLayer, this.particleLayer);
    }

    onUpdate() {
        this.handleAnimations();
        this.handleGSBuilderStateChange();
        genericMenuViewUpdate(this.handler, this.input, 0.7, this.guiLayer, this.particleLayer);
    }

    createCharacterAvatars(attr) {
        const ids = this.rng.shuffle(attr.partyMembers);
        return ids.map(id => {
            const template = characterTemplates.find(t => t.id === id);
            return SheetManager[template.spritesheet].get(template.spriteX, template.spriteY);
        });
    }

    handleAnimations() {
        if(this.rng.chance(0.1)) {
            const animation = CharacterJumpJiggleAnimation.create(this.rng.int(5, 20));
            const avatar = this.rng.choice(this.avatars);
            if(avatar.animations.length === 0) {
                avatar.addAnimation(animation);
                if (this.rng.chance(0.5)) {
                    avatar.flip();
                }
            } 
        }
        if(this.rng.chance(0.01)) {
            const avatar = this.rng.choice(this.avatars);
            const [sx, sy] = this.rng.choice([[0, 0], [2, 0], [3, 0], [0, 1], [2, 1]]);
            const bubble = new SpeechBubbleEntity(avatar.x + 40, -90, sx, sy, 90);
            this.particleLayer.add(bubble);
        }
        if(this.loop.tickCount % 200 === 0) {
            this.particleLayer.entities = this.particleLayer.entities.filter(p => {
                const isAnimationFinished = p.durationLeft < 0;
                return !isAnimationFinished;
            });
        } 
    }  
    
    handleGSBuilderStateChange() {
        if(this.loadingFinished) {
            return;
        }
        const {completionState: cs, isFinished: fin} = this.gsBuilder;
        if(fin && cs >= 1) {
            this.loadingFinished = true;
            this.loadingBar.setFrame(0, 13);
            this.continueButton.enable();
        } else {
            this.loadingBar.setFrame(0, Math.floor(cs * 14));
        }
    }   

    toGameplay() {
        this.game.state.gameState = this.gsBuilder.state;
        this.game.toView(GameWorldView);
    }

}
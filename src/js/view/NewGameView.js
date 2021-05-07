const Mx = require("../lib/mx");
const MenuButtonComponent = require("./gui/components/MenuButtonComponent");
const MenuTitleComponent = require("./gui/components/MenuTitleComponent");
const SeedInputComponent = require("./gui/components/SeedInputComponent");
const GameMode = require("../const/game-mode.enum");
const characterTemplates = require('./../../assets/json/characters.json');
const CharacterSelectionButtonComponent = require("./gui/components/CharacterSelectionButtonComponent");
const LoadingView = require("./LoadingView");
const { scaleAndCenterLayers, genericMenuViewUpdate } = require("../util/viewsUtil");
const { seed } = require("../util/random");

module.exports = class NewGameView extends Mx.View {

    onCreate() {
        this.rng = Mx.Rng.fromMathRandom();
        this.selectedMode = GameMode.MEDIUM;
        this.selectedCharacterIds = [];
        this.title = new MenuTitleComponent('New game');
        this.title.place(0, -180);
        this.seedInput = new SeedInputComponent();
        this.seedInput.place(-20, -98);
        this.easyModeButton = new MenuButtonComponent('Easy', 32, () => this.onModeButtonToggle(GameMode.EASY));
        this.easyModeButton.place(-300, -20);
        this.mediumModeButton = new MenuButtonComponent('Medium', 32, () => this.onModeButtonToggle(GameMode.MEDIUM)).disable();
        this.mediumModeButton.place(-300, 50);
        this.hardModeButton = new MenuButtonComponent('Hard', 32, () => this.onModeButtonToggle(GameMode.HARD));
        this.hardModeButton.place(-300, 120);
        this.characterSelectionButtons = characterTemplates.map(t => new CharacterSelectionButtonComponent(t, (t, state) => this.onCharacterToggle(t, state)));
        this.characterSelectionButtons.forEach((b, i) => {
            const x = - 165 + (i % 4) * 110;
            const y = i > 3 ? 95: -15;
            b.place(x, y);
        });
        this.nofSelectedText = Mx.Text.create(300, -10, '', '#999999', 40, 'pixel', 0, 1, 'center');
        this.resetButton = new MenuButtonComponent('Reset', 32, () => this.onReset(), true);
        this.resetButton.place(300, 50);
        this.randomizeButton = new MenuButtonComponent('', 'Dice', () => this.onRandomize(), true);
        this.randomizeButton.place(300, 120);
        this.playButton = new MenuButtonComponent('Play', 48, () => this.startNewGame());
        this.playButton.place(-105, 200);
        this.returnButton = new MenuButtonComponent('Return', 48, () => this.game.toView(require("./MainMenuView")));
        this.returnButton.place(105, 200);
        this.guiLayer = Mx.Layer.create({
            entities: [
                this.title,
                this.seedInput, 
                this.easyModeButton, this.mediumModeButton, this.hardModeButton,
                ...this.characterSelectionButtons, 
                this.nofSelectedText, this.resetButton, this.randomizeButton,
                this.playButton, this.returnButton
            ]
        });
        this.setPlayButtonState();
    }

    onResize() {
        scaleAndCenterLayers(this.handler, this.guiLayer);
    }

    onUpdate() {
        genericMenuViewUpdate(this.handler, this.input, this.guiLayer);
    }

    onModeButtonToggle(mode) {
        if(mode === GameMode.EASY) {
            this.easyModeButton.disable();
            this.mediumModeButton.enable();
            this.hardModeButton.enable();
        } else if(mode === GameMode.MEDIUM) {
            this.easyModeButton.enable();
            this.mediumModeButton.disable();
            this.hardModeButton.enable();
        } else {
            this.easyModeButton.enable();
            this.mediumModeButton.enable();
            this.hardModeButton.disable();
        }
    }

    onCharacterToggle(characterTemplate, state) {
        if(state) {
            this.selectedCharacterIds.push(characterTemplate.id);
        } else {
            this.selectedCharacterIds = this.selectedCharacterIds.filter(id => id !== characterTemplate.id);
        }
        this.setPlayButtonState();
    }

    onReset() {
        for(let button of this.characterSelectionButtons) {
            button.setSelected(false);
        }
        this.selectedCharacterIds = [];
        this.setPlayButtonState();
    }

    onRandomize() {
        const choices = this.rng.choices(characterTemplates.map(t => t.id), 3, true);
        for(let button of this.characterSelectionButtons) {
            const state = choices.includes(button.options.characterTemplate.id);
            button.setSelected(state);
        }
        this.selectedCharacterIds = choices;
        this.setPlayButtonState();
    }

    getNewGameAttributes() {
        return {
            seed: this.seedInput.value.content || seed(this.rng),
            mode: this.selectedMode,
            partyMembers: this.selectedCharacterIds
        };
    }

    setPlayButtonState() {
        this.nofSelectedText.content = `${this.selectedCharacterIds.length} of 3`;
        if(this.selectedCharacterIds.length === 3) {
            this.nofSelectedText.color = '#ffffff';
            this.playButton.enable();
        } else {
            this.nofSelectedText.color = '#999999';
            this.playButton.disable();
        }
    }

    startNewGame() {
        this.game.state.newGameAttributes = this.getNewGameAttributes();
        this.game.toView(LoadingView);
    }

}
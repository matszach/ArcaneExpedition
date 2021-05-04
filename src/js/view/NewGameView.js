const Mx = require("../lib/mx");
const MenuButtonComponent = require("./gui/components/MenuButtonComponent");
const MenuTitleComponent = require("./gui/components/MenuTitleComponent");
const MenuBackgroundAnimation = require("./gui/misc/MenuBackgroundAnimation");
const VersionInfo = require("./gui/misc/VersionInfo");
const Cursor = require("./gui/misc/Cursor");
const SeedInputComponent = require("./gui/components/SeedInputComponent");
const GameMode = require("../const/game-mode.enum");
const characterTemplates = require('./../../assets/json/characters.json');
const CharacterSelectionButtonComponent = require("./gui/components/CharacterSelectionButtonComponent");
const NofSelectedCharactersDisplay = require("./gui/misc/NofSelectedCharactersDisplay");
const LoadingView = require("./LoadingView");

module.exports = class NewGameView extends Mx.View {

    onCreate() {
        this.rng = Mx.Rng.fromMathRandom();
        this.title = new MenuTitleComponent('New game');
        this.seedInput = new SeedInputComponent();
        this.selectedMode = GameMode.MEDIUM;
        this.easyModeButton = new MenuButtonComponent('Easy', 32, () => this.onModeButtonToggle(GameMode.EASY));
        this.mediumModeButton = new MenuButtonComponent('Medium', 32, () => this.onModeButtonToggle(GameMode.MEDIUM)).disable();
        this.hardModeButton = new MenuButtonComponent('Hard', 32, () => this.onModeButtonToggle(GameMode.HARD));
        this.selectedCharacterIds = [];
        this.characterSelectionButtons = characterTemplates.map(t => new CharacterSelectionButtonComponent(t, (t, state) => this.onCharacterToggle(t, state)));
        this.resetButton = new MenuButtonComponent('Reset', 32, () => this.onReset(), true);
        this.randomizeButton = new MenuButtonComponent('', 'Dice', () => this.onRandomize(), true);
        this.playButton = new MenuButtonComponent('Play', 48, () => this.startNewGame()).disable();
        this.returnButton = new MenuButtonComponent('Return', 48, () => this.game.toView(require("./MainMenuView")));
    }

    onResize() {
        const {width: vw, height: vh} = this.handler.canvas;
        this.title.place(vw/2, vh/2 - 180);
        this.seedInput.place(vw/2 - 20, vh/2 - 98);
        this.easyModeButton.place(vw/2 - 300, vh/2 - 20);
        this.mediumModeButton.place(vw/2 - 300, vh/2 + 50);
        this.hardModeButton.place(vw/2 - 300, vh/2 + 120);
        this.characterSelectionButtons.forEach((b, i) => {
            const x = vw/2 - 165 + (i % 4) * 110;
            const y = vh/2 + (i > 3 ? 95: -15);
            b.place(x, y);
        });
        this.resetButton.place(vw/2 + 300, vh/2 + 50);
        this.randomizeButton.place(vw/2 + 300, vh/2 + 120);
        this.playButton.place(vw/2 - 105, vh/2 + 200);
        this.returnButton.place(vw/2 + 105, vh/2 + 200);
    }

    onUpdate() {
        this.handler.clear();
        MenuBackgroundAnimation.handle(this.handler, this.input);
        this.handler.handles([
            this.title,
            this.seedInput, 
            this.easyModeButton, this.mediumModeButton, this.hardModeButton,
            ...this.characterSelectionButtons, 
            this.resetButton, this.randomizeButton,
            this.playButton, this.returnButton
        ]);
        NofSelectedCharactersDisplay.handle(this.handler, this.input, this.selectedCharacterIds);
        VersionInfo.handle(this.handler);
        Cursor.draw(this.handler, this.input);
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

    generateRandomSeed() {
        const chars = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
        const seed = this.rng.choices(chars, 12, false).join('');
        return seed;
    }

    getNewGameAttributes() {
        return {
            seed: this.seedInput.value.content || this.generateRandomSeed(),
            mode: this.selectedMode,
            partyMembers: this.selectedCharacterIds
        };
    }

    setPlayButtonState() {
        if(this.selectedCharacterIds.length === 3) {
            this.playButton.enable();
        } else {
            this.playButton.disable();
        }
    }

    startNewGame() {
        this.game.state.newGameAttributes = this.getNewGameAttributes();
        this.game.toView(LoadingView);
    }

}
const Mx = require("../lib/mx");
const MenuButtonComponent = require("./gui/components/MenuButtonComponent");
const MenuTitleComponent = require("./gui/components/MenuTitleComponent");
const MenuBackgroundAnimation = require("./gui/misc/MenuBackgroundAnimation");
const VersionInfo = require("./gui/misc/VersionInfo");
const Cursor = require("./gui/misc/Cursor");
const SeedInputComponent = require("./gui/components/SeedInputComponent");
const GameMode = require("../const/game-mode.enum");

module.exports = class NewGameView extends Mx.View {

    onCreate() {
        this.title = new MenuTitleComponent('New game');
        this.seedInput = new SeedInputComponent();
        this.selectedMode = GameMode.MEDIUM;
        this.easyModeButton = new MenuButtonComponent('Easy', 32, () => this.onModeButtonToggle(GameMode.EASY));
        this.mediumModeButton = new MenuButtonComponent('Medium', 32, () => this.onModeButtonToggle(GameMode.MEDIUM)).disable();
        this.hardModeButton = new MenuButtonComponent('Hard', 32, () => this.onModeButtonToggle(GameMode.HARD));
        this.playButton = new MenuButtonComponent('Play', 48, () => this.startNewGame());
        this.returnButton = new MenuButtonComponent('Return', 48, () => this.game.toView(require("./MainMenuView")));
    }

    onResize() {
        const {width: vw, height: vh} = this.handler.canvas;
        this.title.place(vw/2, vh/2 - 180);
        this.seedInput.place(vw/2 - 230, vh/2 - 98);
        this.easyModeButton.place(vw/2 + 80, vh/2 - 100);
        this.mediumModeButton.place(vw/2 + 220, vh/2 - 100);
        this.hardModeButton.place(vw/2 + 360, vh/2 - 100);
        this.playButton.place(vw/2 - 120, vh/2 + 200);
        this.returnButton.place(vw/2 + 120, vh/2 + 200);
    }

    onUpdate() {
        this.handler.clear();
        MenuBackgroundAnimation.handle(this.handler, this.input);
        this.handler.handles([
            this.title,
            this.seedInput, this.easyModeButton, this.mediumModeButton, this.hardModeButton,
            this.playButton, this.returnButton
        ]);
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

    getNewGameAttributes() {
        return {
            seed: this.seedInput.value.content,
            mode: this.selectedMode,
            partyMembers: []
        };
    }

    startNewGame() {
        console.log(this.getNewGameAttributes());
    }

}
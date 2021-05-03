const Mx = require("../lib/mx");
const Cursor = require("./gui/Cursor");
const MenuBackgroundAnimation = require("./gui/MenuBackgroundAnimation");
const MenuButtonComponent = require("./gui/MenuButtonComponent");
const MenuTitleComponent = require("./gui/MenuTitleComponent");
const VersionInfo = require("./gui/VersionInfo");

module.exports = class MainMenuView extends Mx.View {

    onCreate() {
        this.title = new MenuTitleComponent('Main Menu');
        this.newGameButton = new MenuButtonComponent('New game', () => this.game.toView(require("./NewGameView")));
        this.continueButton = new MenuButtonComponent('Continue', () => {}).disable();
        this.optionsButton = new MenuButtonComponent('Options', () => {}).disable();
        this.creditsButton = new MenuButtonComponent('Credits', () => {}).disable();
    }

    onResize() {
        const {width: vw, height: vh} = this.handler.canvas;
        this.title.place(vw/2, vh/2 - 120);
        this.newGameButton.place(vw/2 - 150, vh/2);
        this.continueButton.place(vw/2 + 150, vh/2);
        this.optionsButton.place(vw/2 - 150, vh/2 + 120);
        this.creditsButton.place(vw/2 + 150, vh/2 + 120);
    }

    onUpdate() {
        this.handler.clear();
        MenuBackgroundAnimation.handle(this.handler, this.input);
        this.handler.handles([
            this.title, 
            this.newGameButton, 
            this.continueButton,
            this.optionsButton,
            this.creditsButton
        ]);
        VersionInfo.handle(this.handler);
        Cursor.draw(this.handler, this.input);
    }

}
const Mx = require("../lib/mx");
const MenuBackgroundAnimation = require("./gui/MenuBackgroundAnimation");
const MenuButtonComponent = require("./gui/MenuButtonComponent");
const MenuTitleComponent = require("./gui/MenuTitleComponent");
const VersionInfo = require("./gui/VersionInfo");

module.exports = class MainMenuView extends Mx.View {

    onCreate() {
        const buttonSheet = Mx.SpriteSheet.create('assets/img/buttons.png', 48, 16, 1, 4);
        this.title = new MenuTitleComponent(0, 0, 'Main Menu');
        this.newGameButton = new MenuButtonComponent(0, 0, buttonSheet, 'New game', () => {});
        this.loadGameButton = new MenuButtonComponent(0, 0, buttonSheet, 'Load game', () => {});
        this.optionsButton = new MenuButtonComponent(0, 0, buttonSheet, 'Options', () => {});
        this.creditsButton = new MenuButtonComponent(0, 0, buttonSheet, 'Credits', () => {});
    }

    onResize() {
        const {width: vw, height: vh} = this.handler.canvas;
        this.title.place(vw/2, vh/2 - 120);
        this.newGameButton.place(vw/2 - 150, vh/2);
        this.loadGameButton.place(vw/2 + 150, vh/2);
        this.optionsButton.place(vw/2 - 150, vh/2 + 120);
        this.creditsButton.place(vw/2 + 150, vh/2 + 120);
    }

    onUpdate() {
        this.handler.clear();
        MenuBackgroundAnimation.handle(this.handler, this.input);
        this.handler.handles([
            this.title, 
            this.newGameButton, 
            this.loadGameButton,
            this.optionsButton,
            this.creditsButton
        ]);
        VersionInfo.handle(this.handler);
    }

}
const Mx = require("../lib/mx");
const MenuButtonComponent = require("./gui/MenuButtonComponent");
const MenuTitleComponent = require("./gui/MenuTitleComponent");
const MainMenuView = require("./MainMenuView");
const MenuBackgroundAnimation = require("./gui/MenuBackgroundAnimation");
const VersionInfo = require("./gui/VersionInfo");

module.exports = class BootView extends Mx.View {

    onCreate() {
        const buttonSheet = Mx.SpriteSheet.create('assets/img/buttons.png', 48, 16, 1, 4);
        this.vInfo = new VersionInfo();
        this.title = new MenuTitleComponent(0, 0, 'Arcane Expedition');
        this.playButton = new MenuButtonComponent(0, 0, buttonSheet, 'Play', () => this.game.toView(MainMenuView));
        this.exitButton =  new MenuButtonComponent(0, 0, buttonSheet, 'Exit', () => window.close());
    }

    onResize() {
        const {width: vw, height: vh} = this.handler.canvas;
        this.title.place(vw/2, vh/2 - 50);
        this.playButton.place(vw/2 - 150, vh/2 + 50);
        this.exitButton.place(vw/2 + 150, vh/2 + 50);
    }

    onUpdate() {
        this.handler.clear();
        MenuBackgroundAnimation.handle(this.handler, this.input);
        this.handler.handles([
            this.title,
            this.playButton, 
            this.exitButton
        ]);
        VersionInfo.handle(this.handler);
    }

}
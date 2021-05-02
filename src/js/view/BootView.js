const Mx = require("../lib/mx");
const MenuButtonComponent = require("./gui/MenuButtonComponent");
const MenuTitleComponent = require("./gui/MenuTitleComponent");
const MenuBackgroundAnimation = require("./gui/MenuBackgroundAnimation");
const VersionInfo = require("./gui/VersionInfo");
const Cursor = require("./gui/Cursor");

module.exports = class BootView extends Mx.View {

    onCreate() {
        this.title = new MenuTitleComponent('Arcane Expedition');
        this.playButton = new MenuButtonComponent('Play', () => this.game.toView(require("./MainMenuView")));
        this.exitButton =  new MenuButtonComponent('Exit', () => window.close());
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
        Cursor.draw(this.handler, this.input);
    }

}
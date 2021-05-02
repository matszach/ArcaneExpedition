const Mx = require("../lib/mx");
const MenuButtonComponent = require("./gui/MenuButtonComponent");
const MenuTitleComponent = require("./gui/MenuTitleComponent");
const MenuBackgroundAnimation = require("./gui/MenuBackgroundAnimation");
const VersionInfo = require("./gui/VersionInfo");
const Cursor = require("./gui/Cursor");
const SeedInputComponent = require("./gui/SeedInputComponent");

module.exports = class NewGameView extends Mx.View {

    onCreate() {
        this.title = new MenuTitleComponent('New game');
        this.seedInput = new SeedInputComponent();
        this.returnButton = new MenuButtonComponent('Return', () => this.game.toView(require("./MainMenuView")));
    }

    onResize() {
        const {width: vw, height: vh} = this.handler.canvas;
        this.title.place(vw/2, vh/2 - 120);
        this.seedInput.place(vw/2 - 15, vh/2 - 40);
        this.returnButton.place(vw/2, vh/2 + 50);
    }

    onUpdate() {
        this.handler.clear();
        MenuBackgroundAnimation.handle(this.handler, this.input);
        this.handler.handles([
            this.title,
            this.seedInput,
            this.returnButton
        ]);
        VersionInfo.handle(this.handler);
        Cursor.draw(this.handler, this.input);
    }

}
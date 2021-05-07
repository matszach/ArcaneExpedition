const Mx = require("../lib/mx");
const MenuButtonComponent = require("./gui/components/MenuButtonComponent");
const MenuTitleComponent = require("./gui/components/MenuTitleComponent");
const { scaleAndCenterLayers, genericMenuViewUpdate } = require("../util/viewsUtil");

module.exports = class BootView extends Mx.View {

    onCreate() {
        this.title = new MenuTitleComponent('Arcane Expedition');
        this.title.place(0, -50);
        this.playButton = new MenuButtonComponent('Play', 48, () => this.game.toView(require("./MainMenuView")));
        this.playButton.place(-150, 50);
        this.exitButton =  new MenuButtonComponent('Exit', 48, () => window.close());
        this.exitButton.place(150, 50);
        this.guiLayer = Mx.Layer.create({ entities: [this.title, this.playButton, this.exitButton] });
    }

    onResize() {
        scaleAndCenterLayers(this.handler, this.guiLayer);
    }

    onUpdate() {
        genericMenuViewUpdate(this.handler, this.input, this.guiLayer);
    }

}
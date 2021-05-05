const Mx = require("../lib/mx");
const MenuButtonComponent = require("./gui/components/MenuButtonComponent");
const MenuTitleComponent = require("./gui/components/MenuTitleComponent");
const { scaleAndCenterLayer, genericMenuViewUpdate } = require("../util/viewsUtil");

module.exports = class MainMenuView extends Mx.View {

    onCreate() {
        this.title = new MenuTitleComponent('Main Menu');
        this.title.place(0, -180)
        this.newGameButton = new MenuButtonComponent('New game', 48, () => this.game.toView(require("./NewGameView")));
        this.newGameButton.place(-150, 0);
        this.continueButton = new MenuButtonComponent('Continue', 48, () => {}).disable();
        this.continueButton.place(150, 0);
        this.optionsButton = new MenuButtonComponent('Options', 48, () => {}).disable();
        this.optionsButton.place(-150, 120);
        this.creditsButton = new MenuButtonComponent('Credits', 48, () => {}).disable();
        this.creditsButton.place(150, 120);
        this.guiLayer = Mx.Layer.create({ 
            entities: [
                this.title, this.newGameButton, this.continueButton, 
                this.optionsButton, this.creditsButton
            ] 
        });
    }

    onResize() {
        scaleAndCenterLayer(this.guiLayer, this.handler)
    }

    onUpdate() {
        genericMenuViewUpdate(this.handler, this.input, this.guiLayer);
    }

}
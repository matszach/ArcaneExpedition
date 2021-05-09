const Mx = require("../lib/mx");
const MenuButtonComponent = require("./gui/components/MenuButtonComponent");
const MenuTitleComponent = require("./gui/components/MenuTitleComponent");
const { scaleAndCenterLayers, genericMenuViewUpdate } = require("../util/viewsUtil");

module.exports = class MainMenuView extends Mx.View {

    onCreate() {
        this.title = new MenuTitleComponent('Main Menu');
        this.title.place(0, -180)
        this.newGameButton = new MenuButtonComponent('New game', 48, () => this.game.toView(require("./NewGameView")));
        this.newGameButton.place(-150, 0);
        this.continueButton = new MenuButtonComponent('Continue', 48, () => this.game.toView(require("./GameWorldView"))).disable();
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
        this.setContinueButtonState();
    }

    onResize() {
        scaleAndCenterLayers(this.handler, this.guiLayer)
    }

    onUpdate() {
        genericMenuViewUpdate(this.handler, this.input, 0.7, this.guiLayer);
    }

    setContinueButtonState() {
        if(!!this.game.state.gameState) {
            this.continueButton.enable();
        } else {
            // should try to read a loaded state file if present
            // here or on game boot;
        }
    }

}
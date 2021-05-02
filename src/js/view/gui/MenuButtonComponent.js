const Mx = require("../../lib/mx");
const SheetManager = require("../../service/SheetManager");

module.exports = class MenuButtonComponent extends Mx.Gui.GuiComponent {

    constructor(value = 'Button', action = () => {}) {
        super(0, 0, {value, action});
    }

    isPointOver(x, y) {
        return this.body.isPointOver(x, y);
    }

    construct() {
        this.body = SheetManager.button.get(0, 0);
        this.text = Mx.Text.create(0, 10, this.options.value, '#ffffff', 40, 'pixel', 0, 1, 'center');
        this.container.adds(this.body, this.text);
        this.on('over', () => {
            this.body.setFrame(0, 1);
        }).on('out', () => {
            this.body.setFrame(0, 0);
        }).on('down', () => {
            this.body.setFrame(0, 2);
            this.text.move(0, 5);
        }).on('up', () => {
            this.body.setFrame(0, 0);
            this.text.move(0, -5);
            this.options.action();
        });
    }

}

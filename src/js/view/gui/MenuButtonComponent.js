const Mx = require("../../lib/mx");

module.exports = class MenuButtonComponent extends Mx.Gui.GuiComponent {

    constructor(x, y, sheet, value = 'Button', action = () => {}) {
        super(x, y, {sheet, value, action});
    }

    isPointOver(x, y) {
        return this.body.isPointOver(x, y);
    }

    construct() {
        this.body = this.options.sheet.get(0, 0);
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

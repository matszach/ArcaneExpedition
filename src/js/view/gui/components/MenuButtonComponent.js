const Mx = require("../../../lib/mx");
const SheetManager = require("../../../service/SheetManager");
const Cursor = require("./../misc/Cursor");

module.exports = class MenuButtonComponent extends Mx.Gui.GuiComponent {

    constructor(value = 'Button', size = 48, action = () => {}) {
        super(0, 0, {value, size, action});
    }

    disable() {
        this.body.setFrame(0, 3);
        this.text.color = '#888888';
        this.clearListeners();
        this.on('out', () => { 
            Cursor.key = 'arrow';
        });
        return this;
    }

    enable() {
        this.body.setFrame(0, 0);
        this.text.color = '#ffffff';
        this.clearListeners();
        this.on('over', () => {
            this.body.setFrame(0, 1);
            Cursor.key = 'pointer';
        }).on('out', () => {
            this.body.setFrame(0, 0);
            Cursor.key = 'arrow';
        }).on('down', () => {
            this.body.setFrame(0, 2);
            this.text.move(0, 5);
        }).on('up', () => {
            this.body.setFrame(0, 0);
            this.text.move(0, -5);
            this.options.action();
            Cursor.key = 'arrow';
        });
        return this;
    }

    isPointOver(x, y) {
        return this.body.isPointOver(x, y);
    }

    construct() {
        this.body = SheetManager['button' + this.options.size].get(0, 0);
        this.text = Mx.Text.create(0, 10, this.options.value, '#ffffff', 40, 'pixel', 0, 1, 'center');
        this.container.adds(this.body, this.text);
        this.enable();
    }

}

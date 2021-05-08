const Mx = require("../../../lib/mx");

module.exports = class MenuTitleComponent extends Mx.Gui.GuiComponent {

    constructor(value = 'Title') {
        super(0, 0, {value});
    }

    construct() {
        this.text = Mx.Text.create(0, 0, this.options.value, '#ffffff', 80, 'pixel', 0, 1, 'center');
        this.shadow = Mx.Text.create(0, 10, this.options.value, 'rgba(120, 60, 0, 0.5)', 82, 'pixel', 0, 1, 'center');
        this.container.adds(this.shadow, this.text);
    }

}

const { stat } = require("original-fs");
const Mx = require("../../lib/mx");
const SheetManager = require("../../service/SheetManager");
const Cursor = require("./Cursor");

module.exports = class SeedInputComponent extends Mx.Gui.GuiComponent {

    constructor() {
        super(0, 0);
        this.active = false;
        this.state = '';
    }

    listen() {
        return this.input.listen();
    }

    construct() {
        this.input = SheetManager.textinput.get(0, 0).place(220, 0);
        this.value = Mx.Text.create(220, 10, ' ', '#ffffff', 40, 'pixel', 0, 1, 'center');
        this.label = Mx.Text.create(0, 10, 'Seed:', '#ffffff', 40, 'pixel', 0, 1, 'center');
        this.container.adds(this.label, this.input, this.value);
        this.input.on('over', () => {
            if(!this.active) {
                this.input.setFrame(0, 1);
            }
            Cursor.key = 'text';
        }).on('out', () => {
            if(!this.active) {
                this.input.setFrame(0, 0);
            }
            Cursor.key = 'arrow';
        }).on('up', () => {
            this.active = !this.active;
            if(this.active) {
                this.input.setFrame(0, 2);
            } else {
                this.input.setFrame(0, 1);
            }
        });
        window.addEventListener('keydown', event => {
            if(this.active) {
                if(event.key === 'Backspace') {
                    this.state = this.state.slice(0, this.state.length - 1);
                } else if(event.key === 'Enter') {
                    this.active = false;
                    this.input.setFrame(0, 0);
                } else {
                    if(event.key !== ' ' && event.key.length === 1 && this.state.length < 12) {
                        this.state += event.key;
                    }
                }
                this.value.content = this.state;
            }
        });
    }

}

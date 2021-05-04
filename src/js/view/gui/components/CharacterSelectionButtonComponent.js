const Mx = require("../../../lib/mx");
const SheetManager = require("../../../service/SheetManager");
const Cursor = require("../misc/Cursor");

module.exports = class CharacterSelectionButtonComponent extends Mx.Gui.GuiComponent {

    constructor(characterTemplate, change) {
        super(0, 0, {characterTemplate, change});
        this.selected = false;
    }

    isPointOver(x, y) {
        return this.background.isPointOver(x, y);
    }

    setSelected(state) {
        this.selected = state;
        if(this.selected) {
            this.background.setFrame(0, 2);
            this.characterName.color = '#ffffff';
        } else {
            this.background.setFrame(0, 0);
            this.characterName.color = '#999999';
        }
    }

    construct() {
        this.background = SheetManager.characterSelectBackground.get(0, 0);
        this.characterIcon = SheetManager.characters.get(0, this.options.characterTemplate.y).move(0, 5);
        this.characterName = Mx.Text.create(0, -25, this.options.characterTemplate.name, '#999999', 20, 'pixel', 0, 1, 'center');
        this.container.adds(this.background, this.characterIcon, this.characterName);
        this.on('over', () => {
            if(!this.selected) {
                this.background.setFrame(0, 1);
            }
            Cursor.key = 'pointer';
        }).on('out', () => {
            if(!this.selected) {
                this.background.setFrame(0, 0);
            }
            Cursor.key = 'arrow';
        }).on('up', () => {
            this.selected = !this.selected;
            this.options.change(this.options.characterTemplate, this.selected);
            if(this.selected) {
                this.background.setFrame(0, 2);
                this.characterName.color = '#ffffff';
            } else {
                this.background.setFrame(0, 1);
                this.characterName.color = '#999999';
            }
        });
    }

}

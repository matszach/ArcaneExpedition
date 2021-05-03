const SheetManager = require("../../service/SheetManager");

module.exports = Cursor = {

    key: 'arrow',

    draw(handler, input) {
        let sprite;
        switch(this.key) {
            case 'hidden': 
                return;
            case 'text':
                sprite = SheetManager.cursor.get(1, 0);
                break;
            case 'pointer':
                sprite = SheetManager.cursor.get(2, 0);
                break;
            case 'arrow':
            default:
                sprite = SheetManager.cursor.get(0, 0);
                break;
        }
        const {xInCanvas: mx, yInCanvas: my} = input.mouse();
        sprite.place(mx, my);
        handler.draw(sprite);
    }

}
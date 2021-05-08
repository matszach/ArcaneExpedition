const Mx = require("../../../lib/mx");
const Cursor = require("../misc/Cursor");

module.exports = class ActiveText extends Mx.Text {

    setAction(onClick = () => {}, onHover = () => {}) {
        const originalColor = this.color;
        this.on('over', () => {
            this.color = '#b86f50';
            Cursor.key = 'pointer';
        }).on('out', () => {
            this.color = originalColor;
            onHover();
            Cursor.key = 'arrow';
        }).on('down', () => {
            this.color = '#a35e43';
        }).on('up', () => {
            this.color = '#b86f50';
            onClick();
        });
        return this;
    } 

}
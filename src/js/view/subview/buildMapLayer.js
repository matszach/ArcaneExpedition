const Mx = require("../../lib/mx");
const SheetManager = require("../../service/SheetManager");

module.exports = function buildMapLayer(view) {
    const mapContainer = Mx.Container.create();
    view.worldMap.fields.forEach((f, x, y) => {
        const fieldSprite = SheetManager.mapfields.get(Math.floor(Math.random() * 9), 0);
        fieldSprite.setDrawnSize(32, 32);
        fieldSprite.place(x * 34, y * 34);
        f.spriteRef = fieldSprite;
        fieldSprite.on('down', () => {
            fieldSprite.scale(0.85);
        }).on('up', () => {
            fieldSprite.scale(1/0.85);
            console.log(x, y); // TODO on field clicked here
        }).on('over', () => {
            fieldSprite.scale(1.1);
        }).on('out', () => {
            fieldSprite.scale(1/1.1);
        });
        mapContainer.add(fieldSprite);
    });
    view.worldMap.spriteContainerRef = mapContainer;
    mapContainer.centerOn(0, 0)
    return Mx.Layer.create({ vpX: 0, vpY: 0, vpScale: 1, entities: [mapContainer] });
}
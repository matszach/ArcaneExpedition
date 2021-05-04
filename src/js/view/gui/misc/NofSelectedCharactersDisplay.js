
module.exports = class NofSelectedCharactersDisplay {

    static handle(handler, input, selectedCharacterIds) {
        const {width, height} = handler.canvas;
        const content = `${selectedCharacterIds.length} of 3`;
        const color = selectedCharacterIds.length === 3 ? '#ffffff' : '#999999'; 
        handler.write(width/2 + 250, height/2 - 20, content, color, 40, 'pixel', 0, 1, 'start');
    }

}
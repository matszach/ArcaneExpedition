const Mx = require("../../lib/mx");
const {author, version} = require("./../../../package.json");

module.exports = class VersionInfo {

    static handle(handler) {
        const {width, height} = handler.canvas;
        const content = `Made by ${author}, version ${version}`;
        handler.write(width - 10, height - 10, content, '#ffffff', 15, 'pixel', 0, 0.5, 'end');
    }

}
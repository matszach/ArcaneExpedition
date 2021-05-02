const Mx = require("./lib/mx");
const BootView = require("./view/BootView");
window.addEventListener('DOMContentLoaded', () => {
    Mx.Game.create().toView(BootView);
})

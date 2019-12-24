var Sound = /** @class */ (function () {
    function Sound(src) {
        this.son = new Audio(src);
    }
    Sound.prototype.playSound = function () {
        this.son.play();
    };
    Sound.prototype.getSon = function () {
        return this.son;
    };
    return Sound;
}());

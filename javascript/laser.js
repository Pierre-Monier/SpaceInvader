/// <reference path='animatedobject.ts'/>
/// <reference path='sound.ts'/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Laser = /** @class */ (function (_super) {
    __extends(Laser, _super);
    function Laser(canvas, context, src, x, y, to_left) {
        var _this = _super.call(this, canvas, context, src) || this;
        _this.speed = 30;
        _this.width = 32;
        _this.height = 8;
        _this.pos = new Vector(x, y);
        if (to_left == true) {
            _this.dir = new Vector(-1, 0);
        }
        else {
            _this.dir = new Vector(1, 0);
        }
        _this.soundtrack = new Sound('./sounds/shoot.wav');
        _this.soundtrack.getSon().volume = 0.5;
        return _this;
    }
    Laser.prototype.playSound = function () {
        throw new Error("Method not implemented.");
    };
    Laser.prototype.move = function (update_dir) {
        var limit = this.canvas.width - this.width;
        _super.prototype.move.call(this, false);
        if (this.pos.getX() + this.width >= limit || this.pos.getX() <= 0) {
            this.setTo_delete(true);
        }
    };
    return Laser;
}(AnimatedObject));

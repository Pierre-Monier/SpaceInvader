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
    function Laser(canvas, context, src, x, y, is_monster) {
        var _this = _super.call(this, canvas, context, src) || this;
        _this.is_monster = is_monster;
        _this.speed = 20;
        _this.width = 6;
        _this.height = 20;
        _this.pos = new Vector(x, y);
        if (_this.is_monster === false) {
            _this.dir = new Vector(0, -1);
        }
        else {
            _this.dir = new Vector(0, 1);
        }
        _this.soundtrack = new Sound('./sounds/shoot.wav');
        _this.soundtrack.getSon().volume = 0.5;
        return _this;
    }
    Laser.prototype.playSound = function () {
        throw new Error("Method not implemented.");
    };
    Laser.prototype.move = function (update_dir) {
        var limit = this.canvas.height - this.height;
        _super.prototype.move.call(this, false);
        if (this.pos.getY() + this.width >= limit || this.pos.getY() <= 0) {
            this.setTo_delete(true);
        }
    };
    Laser.prototype.getIs_monster = function () {
        return this.is_monster;
    };
    return Laser;
}(AnimatedObject));

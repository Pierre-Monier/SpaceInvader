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
    function Laser(canvas, context, src, x, y, is_monster, level) {
        var _this = _super.call(this, canvas, context, src) || this;
        _this.is_monster = is_monster;
        if (is_monster && level > 6) {
            _this.speed = 15;
        }
        else if (level > 12) {
            _this.speed = 25;
        }
        else if (is_monster) {
            _this.speed = 10;
        }
        else {
            _this.speed = 25;
        }
        _this.speed = 25;
        if (src === './images/laser3.png') {
            _this.width = 48;
            _this.height = 14;
        }
        else {
            _this.width = 6;
            _this.height = 20;
        }
        _this.pos = new Vector(x, y);
        if (_this.is_monster === false) {
            _this.dir = new Vector(0, -1);
        }
        else {
            _this.dir = new Vector(0, 1);
        }
        _this.soundtrack = new Sound(_this.getSoundFile(src));
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
    Laser.prototype.getSoundFile = function (src) {
        if (this.is_monster) {
            switch (src) {
                case './images/laser3.png':
                    return './sounds/evil_laser2.mp3';
                default:
                    return './sounds/evil_laser1.mp3';
            }
        }
        else {
            return './sounds/shoot.wav';
        }
    };
    return Laser;
}(AnimatedObject));

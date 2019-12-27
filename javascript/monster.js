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
/// <reference path='animatedobject.ts'/>
/// <reference path='sound.ts'/>
var Monster = /** @class */ (function (_super) {
    __extends(Monster, _super);
    function Monster(canvas, context, src, i_tmp, j, speed) {
        var _this = _super.call(this, canvas, context, src) || this;
        _this.horizontal_pos = j;
        _this.speed = speed;
        _this.width = 30;
        _this.height = 32;
        _this.pos = new Vector(i_tmp * _this.width, j * _this.height);
        _this.dir = new Vector(1, 0);
        _this.death_sound = new Sound('./sounds/explosion.wav');
        return _this;
    }
    Monster.prototype.move = function (update_dir) {
        _super.prototype.move.call(this, update_dir = true);
    };
    Monster.prototype.drawObject = function (x, y) {
        _super.prototype.drawObject.call(this, 0, 0);
    };
    Monster.prototype.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
    Monster.prototype.getRandomDir = function () {
        var random = Math.round(Math.random());
        if (random == 0) {
            return -1;
        }
        else {
            return 1;
        }
    };
    Monster.prototype.getPos = function () {
        return this.pos;
    };
    Monster.prototype.getWidth = function () {
        return this.width;
    };
    Monster.prototype.getDir = function () {
        return this.dir;
    };
    Monster.prototype.getHpos = function () {
        return this.horizontal_pos;
    };
    return Monster;
}(AnimatedObject));

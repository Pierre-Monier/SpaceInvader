/// <reference path='vector.ts'/>
/// <reference path='multisprites.ts'/>
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
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero(canvas, context, src) {
        var _this = _super.call(this, canvas, context, src) || this;
        _this.speed = 20;
        _this.width = 53;
        _this.height = 53;
        _this.pos = new Vector(_this.canvas.width / 2, _this.canvas.height - (_this.height + 10));
        _this.dir = new Vector(1, 0);
        _this.laser_left = false;
        _this.yeah = new Sound('./sounds/yeah.mp3');
        return _this;
    }
    Hero.prototype.drawObject = function () {
        _super.prototype.drawObject.call(this, 0, 0);
    };
    Hero.prototype.moveRight = function () {
        _super.prototype.setDirection.call(this, 1, 0);
        _super.prototype.move.call(this, false);
        this.laser_left = false;
    };
    Hero.prototype.moveLeft = function () {
        _super.prototype.setDirection.call(this, -1, 0);
        _super.prototype.move.call(this, false);
        this.laser_left = true;
    };
    Hero.prototype.getPos = function () {
        return this.pos;
    };
    return Hero;
}(MultiSprites));

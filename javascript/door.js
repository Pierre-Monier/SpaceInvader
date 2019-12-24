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
var Door = /** @class */ (function (_super) {
    __extends(Door, _super);
    function Door(canvas, context, src) {
        var _this = _super.call(this, canvas, context, src) || this;
        _this.width = 60;
        _this.height = 60;
        _this.pos = new Vector(_this.getRandomInt(0, _this.canvas.width - _this.width), _this.getRandomInt(0, _this.canvas.height - _this.height));
        _this.lock = false;
        _this.open = new Vector(100, 0);
        _this.close = new Vector(0, 0);
        _this.son = new Sound('./sounds/son_door_open.wav');
        _this.once = true;
        return _this;
    }
    Door.prototype.drawObject = function () {
        // close door
        if (this.lock == true) {
            _super.prototype.drawObject.call(this, this.open.getX(), this.open.getY());
        }
        else {
            _super.prototype.drawObject.call(this, this.close.getX(), this.close.getY());
        }
    };
    Door.prototype.unlock = function () {
        this.lock = true;
        this.son.playSound();
    };
    return Door;
}(MultiSprites));

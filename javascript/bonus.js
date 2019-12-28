/// <reference path='sound.ts'/>
/// <reference path='monster.ts'/>
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
var Bonus = /** @class */ (function (_super) {
    __extends(Bonus, _super);
    function Bonus(canvas, context, src) {
        var _this = _super.call(this, canvas, context, src) || this;
        _this.pos = new Vector(10, 200);
        _this.dir = new Vector(1, 0);
        _this.width = 30;
        _this.height = 32;
        _this.speed = 4;
        return _this;
    }
    Bonus.prototype.move_bonus = function (update_dir, old_dir) {
        _super.prototype.move.call(this, update_dir);
        if (old_dir != this.getDir().getX()) {
            this.setTo_delete(true);
        }
        console.log(this.getTo_delete());
    };
    return Bonus;
}(AnimatedObject));

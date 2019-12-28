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
/// <reference path='sound.ts'/>
/// <reference path='monster.ts'/>
/// <reference path='laser.ts'/>
var Boss = /** @class */ (function (_super) {
    __extends(Boss, _super);
    function Boss(canvas, context, src, i_tmp, j, speed) {
        var _this = _super.call(this, canvas, context, src, i_tmp, j, speed) || this;
        _this.width = 60;
        _this.height = 64;
        _this.pdv = 100;
        return _this;
    }
    return Boss;
}(Monster));

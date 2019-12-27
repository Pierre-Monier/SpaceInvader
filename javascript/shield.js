/// <reference path='vector.ts'/>
/// <reference path='multisprites.ts'/>
/// <reference path='animatedobject.ts'/>
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
var Shield = /** @class */ (function (_super) {
    __extends(Shield, _super);
    function Shield(canvas, context, src, nb_shield) {
        var _this = _super.call(this, canvas, context, src) || this;
        _this.pos = new Vector(((canvas.width / 4) * nb_shield) + 50, 300);
        _this.width = 44;
        _this.height = 32;
        _this.pdv = 3;
        return _this;
    }
    Shield.prototype.hitShield = function () {
        this.pdv--;
        switch (this.pdv) {
            case 1:
                this.img.src = './images/shield2.png';
                break;
            case 2:
                this.img.src = './images/shield1.png';
                // code block
                break;
            case 0:
                this.setTo_delete(true);
                break;
            default:
            // code block
        }
        if (this.pdv === 0) {
            this.setTo_delete(true);
        }
    };
    return Shield;
}(AnimatedObject));

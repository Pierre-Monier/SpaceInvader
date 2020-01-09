var Vector = /** @class */ (function () {
    // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    function Vector(valX, valY) {
        this.x = valX;
        this.y = valY;
    }
    // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    Vector.prototype.getX = function () {
        return this.x;
    };
    // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    Vector.prototype.getY = function () {
        return this.y;
    };
    // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    Vector.prototype.setX = function (valX) {
        this.x = valX;
    };
    // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    Vector.prototype.setY = function (valY) {
        this.y = valY;
    };
    // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    Vector.prototype.setValues = function (valX, valY) {
        this.x = valX;
        this.y = valY;
    };
    // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    Vector.prototype.addToX = function (valX) {
        this.x += valX;
    };
    // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    Vector.prototype.addToY = function (valY) {
        this.y += valY;
    };
    return Vector;
}());
// ZONE de test a decommenter une fois la classe ecrite //
// Une fois tester et fonctionnel, vous pouvez          //
// recommenter le code                                  //
// Pour tester, lancer le fichier index.html sur Chrome //
// et ouvrez la console.                                //
var v = new Vector(5, 3);
v.setValues(12, 9);
v.addToX(1);
v.addToX(-7);
v.addToY(11);
v.addToY(-19);
//////////////////

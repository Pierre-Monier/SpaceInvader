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
console.log("Debut - Test de la classe Vector");
var v = new Vector(5, 3);
console.log("vx , vy =", v.getX(), ",", v.getY(), " (attendu: 5 , 3 )");
v.setValues(12, 9);
console.log("vx , vy =", v.getX(), ",", v.getY(), " (attendu: 12 , 9 )");
v.addToX(1);
console.log("vx =", v.getX(), " (attendu: 13 )");
v.addToX(-7);
console.log("vx =", v.getX(), " (attendu: 6 )");
v.addToY(11);
console.log("vy =", v.getY(), " (attendu: 20 )");
v.addToY(-19);
console.log("vy =", v.getY(), " (attendu: 1 )");
console.log("Fin - Test de la classe Vector");
//////////////////

/// <reference path='door.ts'/>
/// <reference path='invaders.ts'/>
/// <reference path='hero.ts'/>
/// <reference path='monster.ts'/>
/// <reference path='laser.ts'/>
var Invaders = /** @class */ (function () {
    function Invaders(deca, j, nb_m, canvas) {
        this.tab = [];
        this.i_tmp = deca;
        for (var i = 0; i < nb_m; i++) {
            var monstre = new Monster(canvas, canvas.getContext('2d'), "./images/monstre.png", this.i_tmp, j);
            this.i_tmp++;
            if (canvas.width / monstre.getWidth() - deca < this.i_tmp) {
                this.i_tmp = deca;
                j++;
            }
            this.tab.push(monstre);
        }
    }
    return Invaders;
}());

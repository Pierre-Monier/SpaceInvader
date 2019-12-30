/// <reference path='sound.ts'/>
/// <reference path='monster.ts'/>
/// <reference path='laser.ts'/>
/// <reference path='boss.ts'/>
var Invaders = /** @class */ (function () {
    function Invaders(deca, j, nb_m, canvas, speed) {
        this.canvas = canvas;
        this.berger = 0;
        this.change_dir = false;
        this.tab = [];
        this.bosss = [];
        this.i_tmp = deca;
        // this.bonus = new Monster(canvas, canvas.getContext('2d'), "./images/monstre.png", this.i_tmp, (j + 5), speed);
        for (var i = 0; i < nb_m; i++) {
            var monstre = new Monster(canvas, canvas.getContext('2d'), "./images/invader1.png", this.i_tmp, j, speed);
            this.i_tmp++;
            if (canvas.width / monstre.getWidth() - deca < this.i_tmp) {
                this.i_tmp = deca;
                j++;
            }
            this.tab.push(monstre);
        }
    }
    Invaders.prototype.sendBonus = function () {
        // if(this.bonus.getTo_delete){
        //     this.bonus = null;
        //     this.bonus = new Monster(this.canvas, this.canvas.getContext('2d'), "./images/monstre.png", this.i_tmp, 5, 2);
        // }else{
        //     this.bonus.drawObject(0, 0);
        //     this.bonus.move_bonus(true, this.bonus.getDir().getX(), 0, 200);    
        // }
    };
    Invaders.prototype.move = function (tmp_monstres) {
        // ?
        var current_pos_y;
        // use to get the moment on impact
        var old_dir;
        var new_dir;
        // use to change the dir
        for (var i = 0; i < this.tab.length; i++) {
            old_dir = this.tab[i].getDir().getX();
            this.tab[i].move(true);
            new_dir = this.tab[i].getDir().getX();
            if (old_dir != new_dir) {
                current_pos_y = this.tab[i].getPos().getY();
                if (this.change_dir == false) {
                    this.Apos_y_tmp = current_pos_y;
                    this.Bpos_y_tmp = this.Apos_y_tmp + 32;
                }
                this.change_dir = true;
                if (new_dir == -1) {
                    this.is_right = false;
                }
                else {
                    this.is_right = true;
                }
            }
            if (this.tab[i].getTo_delete() == false) {
                tmp_monstres.push(this.tab[i]);
            }
        }
        for (var x = 0; x < this.tab.length; x++) {
            if (this.change_dir == true) {
                this.tab[x].getDir().setValues(0, 1);
                if (this.tab[x].getPos().getY() >= this.Bpos_y_tmp + (this.tab[x].getHpos() * 32)) {
                    if (this.is_right == false) {
                        this.tab[x].getDir().setValues(-1, 0);
                        this.berger++;
                    }
                    else {
                        this.tab[x].getDir().setValues(1, 0);
                        this.berger++;
                    }
                }
                if (this.berger == this.tab.length) {
                    this.berger = 0;
                    this.change_dir = false;
                }
            }
        }
    };
    return Invaders;
}());

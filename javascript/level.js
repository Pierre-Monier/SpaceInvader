/// <reference path='door.ts'/>
/// <reference path='hero.ts'/>
/// <reference path='monster.ts'/>
/// <reference path='laser.ts'/>
var Level = /** @class */ (function () {
    function Level(canvas, context, nb_m) {
        console.log('nbr de monstre : ' + nb_m);
        this.canvas = canvas;
        this.context = context;
        this.door = new Door(canvas, context, './images/porte.png');
        this.hero = new Hero(canvas, context, './images/hero.png');
        this.monstres = [];
        this.laser = [];
        var deca = 4;
        var j = 0;
        var i_tmp = deca;
        for (var i = 0; i < nb_m; i++) {
            var monstre = new Monster(canvas, canvas.getContext('2d'), "./images/monstre.png", i_tmp, j);
            i_tmp++;
            if (this.canvas.width / monstre.getWidth() - deca < i_tmp) {
                i_tmp = deca;
                j++;
            }
            this.monstres.push(monstre);
        }
        this.ondoor = false;
        this.hit = false;
        this.score = 0;
        this.state = "En cours";
    }
    Level.prototype.updateObjects = function () {
        var tmp_laser = [];
        var tmp_monstres = [];
        this.checkCollision();
        for (var i = 0; i < this.monstres.length; i++) {
            this.monstres[i].move(true);
            if (this.monstres[i].getTo_delete() == false) {
                tmp_monstres.push(this.monstres[i]);
            }
        }
        this.monstres = tmp_monstres;
        for (var i = 0; i < this.laser.length; i++) {
            this.laser[i].move(false);
            if (this.laser[i].getTo_delete() == false) {
                tmp_laser.push(this.laser[i]);
            }
        }
        this.laser = tmp_laser;
        this.checkVictory();
    };
    Level.prototype.checkCollision = function () {
        for (var i = 0; i < this.laser.length; i++) {
            for (var j = 0; j < this.monstres.length; j++) {
                if (this.laser[i].collision(this.monstres[j])) {
                    this.hero.yeah.playSound();
                    this.monstres[j].setTo_delete(true);
                    this.laser[i].setTo_delete(true);
                    this.score = this.score + 1;
                }
            }
        }
        for (var m = 0; m < this.monstres.length; m++) {
            if (this.hero.collision(this.monstres[m])) {
                this.hit = true;
            }
        }
        if (this.hero.collision(this.door)) {
            this.ondoor = true;
        }
        // end FOR
    };
    Level.prototype.checkVictory = function () {
        if (this.hit == true) {
            this.state = "Perdu";
        }
        if (this.monstres.length == 0 && this.door.once == true) {
            this.door.unlock();
            this.door.once = false;
        }
        if (this.ondoor == true && this.door.lock == true) {
            this.state = "Gagné !";
        }
    };
    Level.prototype.drawObjects = function (x, y) {
        this.door.drawObject();
        this.hero.drawObject();
        // All monsters
        for (var i = 0; i < this.monstres.length; i++) {
            this.monstres[i].drawObject(0, 0);
        }
        // All lasers
        for (var i = 0; i < this.laser.length; i++) {
            this.laser[i].drawObject(0, 0);
        }
    };
    Level.prototype.keyRight = function () {
        this.hero.moveRight();
    };
    Level.prototype.keyLeft = function () {
        this.hero.moveLeft();
    };
    Level.prototype.keySpace = function () {
        var current_hero_pos = this.hero.getPos();
        var laser = new Laser(this.canvas, this.context, './images/laser.png', current_hero_pos.getX() + (this.hero.getWidth() / 2), current_hero_pos.getY());
        laser.soundtrack.playSound();
        this.laser.push(laser);
    };
    Level.prototype.getLevelScore = function () {
        return this.score; // A changer en temps voulu
    };
    Level.prototype.getLevelState = function () {
        return this.state; // TODO
    };
    return Level;
}());

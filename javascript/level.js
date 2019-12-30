/// <reference path='invaders.ts'/>
/// <reference path='hero.ts'/>
/// <reference path='monster.ts'/>
/// <reference path='laser.ts'/>
/// <reference path='shield.ts'/>
/// <reference path='bonus.ts'/>
var Level = /** @class */ (function () {
    function Level(canvas, context, nb_m, prev_score, level) {
        var _this = this;
        this.canvas = canvas;
        this.context = context;
        this.hero = new Hero(canvas, context, './images/hero.png');
        var deca = 4;
        var j = 0;
        var speed;
        this.fr_shoot = 100;
        if (level > 3) {
            speed = 2;
        }
        else if (level > 3) {
            this.fr_shoot = 50;
        }
        else if (level > 5) {
            this.fr_shoot = 20;
        }
        else {
            speed = 1;
        }
        this.monstres = new Invaders(deca, j, nb_m, this.canvas, speed);
        // this.bonus = new Bonus(canvas, context, './images/monstre.png');
        this.laser = [];
        this.shields = [];
        var nb_shield = 4;
        for (var i = 0; i < nb_shield + 1; i++) {
            var shield = new Shield(canvas, context, './images/shield.png', i);
            this.shields.push(shield);
        }
        this.hit = false;
        this.score = prev_score;
        this.level = level;
        this.state = "En cours";
        this.music = new Sound('./sounds/bg.mp3');
        this.music.getSon().playbackRate = 0.80;
        this.music.playSound();
        setInterval(function () { _this.gif(); }, 1000);
    }
    Level.prototype.updateObjects = function () {
        var tmp_shields = [];
        var tmp_laser = [];
        var tmp_monstres = [];
        this.checkCollision();
        this.monstres.move(tmp_monstres);
        if (Math.floor((Math.random() * this.fr_shoot)) == (this.fr_shoot / 2)) {
            this.monsterAttack();
        }
        this.monstres.tab = tmp_monstres;
        for (var i = 0; i < this.laser.length; i++) {
            this.laser[i].move(false);
            if (this.laser[i].getTo_delete() == false) {
                tmp_laser.push(this.laser[i]);
            }
        }
        for (var i = 0; i < this.shields.length; i++) {
            if (this.shields[i].getTo_delete() == false) {
                tmp_shields.push(this.shields[i]);
            }
        }
        this.laser = tmp_laser;
        this.shields = tmp_shields;
        this.checkVictory();
    };
    Level.prototype.checkCollision = function () {
        for (var i = 0; i < this.laser.length; i++) {
            var _loop_1 = function (j) {
                if (this_1.laser[i].collision(this_1.monstres.tab[j]) && this_1.laser[i].getIs_monster() === false) {
                    var tmp_monster_1 = this_1.monstres.tab[j];
                    this_1.addKillImg(this_1.monstres.tab[j], this_1.addPoint(this_1.monstres.tab[j].getHpos(), this_1.level));
                    this_1.laser[i].setTo_delete(true);
                    this_1.score += this_1.addPoint(this_1.monstres.tab[j].getHpos(), this_1.level);
                    setTimeout(function () { tmp_monster_1.setTo_delete(true); }, 150);
                }
                if (this_1.laser[i].collision(this_1.hero) && this_1.laser[i].getIs_monster() === true) {
                    this_1.hit = true;
                }
            };
            var this_1 = this;
            for (var j = 0; j < this.monstres.tab.length; j++) {
                _loop_1(j);
            }
        }
        for (var y = 0; y < this.shields.length; y++) {
            for (var i = 0; i < this.laser.length; i++) {
                if (this.shields[y].collision(this.laser[i])) {
                    this.laser[i].setTo_delete(true);
                    this.shields[y].hitShield();
                    this.drawShield();
                }
            }
        }
        for (var i = 0; i < this.monstres.tab.length; i++) {
            if (this.monstres.tab[i].collision(this.hero)) {
                this.hit = true;
            }
        }
        // end FOR
    };
    Level.prototype.checkVictory = function () {
        if (this.hit == true) {
            this.state = "Perdu";
        }
        if (this.monstres.tab.length == 0) {
            this.state = "Gagné !";
        }
    };
    Level.prototype.drawObjects = function (x, y) {
        this.hero.drawObject();
        // All monsters
        for (var i = 0; i < this.monstres.tab.length; i++) {
            this.monstres.tab[i].drawObject(this.monstres.tab[i].getXsprite(), 0);
        }
        // All lasers
        for (var i = 0; i < this.laser.length; i++) {
            this.laser[i].drawObject(0, 0);
        }
        this.drawShield();
    };
    Level.prototype.drawShield = function () {
        // All shield
        for (var i = 0; i < this.shields.length; i++) {
            this.shields[i].drawObject(0, 0);
        }
    };
    Level.prototype.addPoint = function (Hpos, niveau) {
        if (niveau < 3) {
            switch (Hpos) {
                case 0:
                    return 25;
                case 1:
                    return 25;
            }
        }
        else if (niveau < 5) {
            switch (Hpos) {
                case 0:
                    return 50;
                case 1:
                    return 50;
                case 2:
                    return 25;
                case 3:
                    return 25;
            }
        }
        else {
            switch (Hpos) {
                case 0:
                    return 100;
                case 1:
                    return 50;
                case 2:
                    return 50;
                case 3:
                    return 25;
                case 4:
                    return 25;
            }
        }
    };
    Level.prototype.addKillImg = function (monstre, point) {
        var new_img;
        switch (point) {
            case 25:
                new_img = './images/point_25.png';
                break;
            case 50:
                new_img = './images/point_50.png';
                break;
            case 100:
                new_img = './images/point_100.png';
                break;
            case 200:
                new_img = './images/point_200.png';
                break;
        }
        monstre.getImg().src = new_img;
        monstre.drawObject(0, 0);
    };
    Level.prototype.gif = function () {
        for (var i = 0; i < this.monstres.tab.length; i++) {
            if (this.monstres.tab[i].getXsprite() == 0) {
                this.monstres.tab[i].setXsprite(30);
            }
            else {
                this.monstres.tab[i].setXsprite(0);
            }
        }
    };
    Level.prototype.sendBonus = function () {
        this.bonus = new Bonus(this.canvas, this.context, './images/monstre.png');
        this.bonus.drawObject(0, 0);
        this.bonus.move_bonus(true, this.bonus.getDir().getX());
    };
    Level.prototype.keyRight = function () {
        this.hero.moveRight();
    };
    Level.prototype.keyLeft = function () {
        this.hero.moveLeft();
    };
    Level.prototype.monsterAttack = function () {
        var rand = Math.floor((Math.random() * this.monstres.tab.length));
        var monster_pos = this.monstres.tab[rand].getPos();
        var evil_laser = new Laser(this.canvas, this.canvas.getContext('2d'), this.monstres.sendLaser(rand), monster_pos.getX() + (this.monstres.tab[rand].getWidth() / 2), monster_pos.getY(), true, this.level);
        evil_laser.soundtrack.playSound();
        this.laser.push(evil_laser);
    };
    Level.prototype.keySpace = function () {
        var current_hero_pos = this.hero.getPos();
        var laser = new Laser(this.canvas, this.context, './images/laser.png', current_hero_pos.getX() + (this.hero.getWidth() / 2), current_hero_pos.getY(), false, this.level);
        laser.soundtrack.playSound();
        this.laser.push(laser);
    };
    Level.prototype.getLevelScore = function () {
        return this.score; // A changer en temps voulu
    };
    Level.prototype.getLevelState = function () {
        return this.state; // TODO
    };
    Level.prototype.getMusic = function () { return this.music; };
    Level.prototype.kill = function () {
        this.hit = true;
    };
    return Level;
}());

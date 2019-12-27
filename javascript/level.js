/// <reference path='invaders.ts'/>
/// <reference path='hero.ts'/>
/// <reference path='monster.ts'/>
/// <reference path='laser.ts'/>
var Level = /** @class */ (function () {
    function Level(canvas, context, nb_m) {
        this.canvas = canvas;
        this.context = context;
        this.hero = new Hero(canvas, context, './images/hero.png');
        var deca = 4;
        var j = 0;
        var speed = 2;
        this.monstres = new Invaders(deca, j, nb_m, this.canvas, speed);
        this.laser = [];
        this.ondoor = false;
        this.hit = false;
        this.score = 0;
        this.state = "En cours";
    }
    Level.prototype.updateObjects = function () {
        var tmp_laser = [];
        var tmp_monstres = [];
        this.checkCollision();
        this.monstres.move(tmp_monstres);
        if (Math.floor((Math.random() * 100) + 1) == 50) {
            this.monsterAttack();
        }
        this.monstres.tab = tmp_monstres;
        for (var i = 0; i < this.laser.length; i++) {
            this.laser[i].move(false);
            if (this.laser[i].getTo_delete() == false) {
                tmp_laser.push(this.laser[i]);
            }
        }
        this.laser = tmp_laser;
        // this.checkVictory(); 
    };
    Level.prototype.checkCollision = function () {
        for (var i = 0; i < this.laser.length; i++) {
            for (var j = 0; j < this.monstres.tab.length; j++) {
                if (this.laser[i].collision(this.monstres.tab[j])) {
                    this.hero.yeah.playSound();
                    if (this.laser[i].getIs_monster() === false) {
                        this.monstres.tab[j].setTo_delete(true);
                        this.laser[i].setTo_delete(true);
                    }
                    this.score = this.score + 1;
                }
            }
        }
        for (var m = 0; m < this.monstres.tab.length; m++) {
            if (this.hero.collision(this.monstres.tab[m])) {
                this.hit = true;
            }
        }
        // end FOR
    };
    // private checkVictory()
    // {
    //     if(this.hit == true){
    //         this.state = "Perdu";
    //     }
    //     if(this.monstres.tab.length == 0){
    //         console.log('victoire');
    //     }
    //     if(this.ondoor == true && this.door.lock == true){
    //         this.state = "Gagné !";
    //     }
    // }
    Level.prototype.drawObjects = function (x, y) {
        this.hero.drawObject();
        // All monsters
        for (var i = 0; i < this.monstres.tab.length; i++) {
            this.monstres.tab[i].drawObject(0, 0);
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
    Level.prototype.monsterAttack = function () {
        var evil_laser = this.monstres.shoot();
        evil_laser.soundtrack.playSound();
        this.laser.push(evil_laser);
    };
    Level.prototype.keySpace = function () {
        var current_hero_pos = this.hero.getPos();
        var laser = new Laser(this.canvas, this.context, './images/laser.png', current_hero_pos.getX() + (this.hero.getWidth() / 2), current_hero_pos.getY(), false);
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

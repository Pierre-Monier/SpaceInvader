/// <reference path='vector.ts'/>
var AnimatedObject = /** @class */ (function () {
    function AnimatedObject(canvas, context, src) {
        this.canvas = canvas;
        this.context = context;
        // Initialisation de img
        this.img = new Image(); // La classe "Image" est une classe deja existante
        this.img.src = src; // Specifie le chemin de l'image a partir de index.html
        // Initialisation de w et h et speed
        this.width = 0;
        this.height = 0;
        this.speed = 0;
        // Initialise pos a null
        this.pos = null;
        this.dir = null;
        this._to_delete = false;
    }
    // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    AnimatedObject.prototype.setSize = function (valW, valH) {
        this.width = valW;
        this.height = valH;
    };
    // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    AnimatedObject.prototype.setPosition = function (x, y) {
        if (this.pos == null) {
            this.pos = new Vector(x, y);
        }
        else {
            this.pos.setValues(x, y);
        }
    };
    AnimatedObject.prototype.setDirection = function (x, y) {
        if (this.dir == null) {
            this.dir = new Vector(x, y);
        }
        else {
            this.dir.setValues(x, y);
        }
    };
    // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    AnimatedObject.prototype.move = function (update_dir) {
        var x = this.pos.getX() + (this.dir.getX() * this.speed);
        var y = this.pos.getY() + (this.dir.getY() * this.speed);
        var test_x = (this.canvas.width - this.width);
        var test_y = (this.canvas.height - this.height);
        if (this.pos.getX() > test_x || this.pos.getX() < 0) {
            x = this.pos.getX() - (this.dir.getX() * this.speed);
            if (update_dir == false) {
                this.setDirection(0, 0);
            }
            else {
                this.setDirection(-this.dir.getX(), this.dir.getY());
            }
        }
        if (this.pos.getY() >= test_y || this.pos.getY() <= 0) {
            y = this.pos.getY() - (this.dir.getY() * this.speed);
            if (update_dir == false) {
                this.setDirection(0, 0);
            }
            else {
                this.setDirection(this.dir.getX(), -this.dir.getY());
            }
        }
        if (x < 0) {
            x = 0;
        }
        else if (x > test_x) {
            x = test_x;
        }
        this.pos.setValues(x, y);
    };
    // A decommenter en temps voulu
    AnimatedObject.prototype.drawObject = function (x, y) {
        this.context.drawImage(this.img, // image a afficher
        x, y, // rect A, coin haut gauche
        this.width, this.height, // rect A, taille
        this.pos.getX(), this.pos.getY(), // rect B, coin haut gauche
        this.width, this.height); // rect B, taille
    };
    AnimatedObject.prototype.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
    AnimatedObject.prototype.getTo_delete = function () {
        return this._to_delete;
    };
    AnimatedObject.prototype.setTo_delete = function (to_delete) {
        this._to_delete = to_delete;
    };
    AnimatedObject.prototype.collision = function (other) {
        var x1 = this.pos.getX();
        var x2 = other.pos.getX();
        var y1 = this.pos.getY();
        var y2 = other.pos.getY();
        if (x1 < x2 + other.width &&
            x1 + this.width > x2 &&
            y1 < y2 + other.height &&
            y1 + this.height > y2) {
            return true;
        }
        else {
            return false;
        }
    };
    AnimatedObject.prototype.getWidth = function () {
        return this.width;
    };
    return AnimatedObject;
}());

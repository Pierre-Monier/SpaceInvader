/// <reference path='invaders.ts'/>
/// <reference path='hero.ts'/>
/// <reference path='monster.ts'/>
/// <reference path='laser.ts'/>
/// <reference path='shield.ts'/>
/// <reference path='bonus.ts'/>

class Level {
    private canvas : HTMLCanvasElement;
    private context : CanvasRenderingContext2D;
    private monstres : Invaders;
    private bonus : Bonus;
    private laser : Array<Laser>;
    private hero : Hero;
    private shields: Array<Shield>;
    // savoir sur il y a une collision
    private hit : Boolean;
    // savoir si un mosntre est touché
    private score : number;
    private level : number;
    private fr_shoot : number;
    // etat du level
    private state : string;

    constructor(canvas : HTMLCanvasElement,
                context : CanvasRenderingContext2D,
                nb_m : number, prev_score : number, level : number)
    {          
        this.canvas = canvas;
        this.context = context;
        this.hero = new Hero(canvas, context, './images/hero.png');
        let deca : number = 4;
        let j : number = 0;
        let speed : number
        this.fr_shoot = 50;
        if(level > 1){
            speed = 2
        }else if(level >3){
            this.fr_shoot = 2;
        }
        else{
            speed = 1
        }
        this.monstres = new Invaders(deca, j, nb_m, this.canvas, speed);
        // this.bonus = new Bonus(canvas, context, './images/monstre.png');
        this.laser = [];
        this.shields = [];
        let nb_shield: number = 4;
        for(let i : number = 0; i<nb_shield+1; i++){
            let shield : Shield = new Shield(canvas, context, './images/shield.png', i);
            this.shields.push(shield);
        }
        this.hit = false;
        this.score = prev_score;
        this.level = level;
        this.state = "En cours";
        // setInterval(() => { this.monstres.sendBonus(canvas, context, "./images/monstre.png", 2, 1, 2) }, 1000 );
    }  

    public updateObjects()
    {
    let tmp_shields : Array<Shield> = [];
    let tmp_laser : Array<Laser> = [];
    let tmp_monstres : Array<Monster> = [];
    this.checkCollision();
    this.monstres.move(tmp_monstres);
    if(Math.floor((Math.random() * this.fr_shoot)) == (this.fr_shoot/2)){
    this.monsterAttack();
    }
    this.monstres.tab = tmp_monstres;
        for(let i : number = 0; i< this.laser.length; i++){
            this.laser[i].move(false);
            if(this.laser[i].getTo_delete() == false){
                tmp_laser.push(this.laser[i]);
            }     
        }
        for(let i : number = 0; i< this.shields.length; i++){
            if(this.shields[i].getTo_delete() == false){
                tmp_shields.push(this.shields[i]);
            }     
        }
        this.laser = tmp_laser; 
        this.shields = tmp_shields
        this.checkVictory(); 
    }
    private checkCollision()
    {
        for(let i : number = 0; i< this.laser.length; i++){
            for(let j : number = 0; j< this.monstres.tab.length; j++){
                    if(this.laser[i].collision(this.monstres.tab[j]) && this.laser[i].getIs_monster() === false){
                            this.monstres.tab[j].setTo_delete(true);
                            this.laser[i].setTo_delete(true);
                            this.score += this.addPoint(this.monstres.tab[j].getHpos(), this.level);  
                    }
                    if(this.laser[i].collision(this.hero) && this.laser[i].getIs_monster() === true){
                        this.hit = true;
                    }
            }      
        }
        for(let y : number = 0; y < this.shields.length; y++){
            for(let i : number = 0; i < this.laser.length; i++){
                if(this.shields[y].collision(this.laser[i])){
                    console.log(' collision : ');
                    this.laser[i].setTo_delete(true);
                    this.shields[y].hitShield();
                    this.drawShield();
                }
            }    
        }
        for(let i : number = 0; i < this.monstres.tab.length; i++){
            if(this.monstres.tab[i].collision(this.hero)){
                this.hit = true;
            }
        }

    // end FOR
    }
    private checkVictory()
    {
        if(this.hit == true){
            this.state = "Perdu";
        }
        if(this.monstres.tab.length == 0){
            this.state = "Gagné !";
        }
    }

    public drawObjects(x : number, y : number)
    {
        this.hero.drawObject();
        // All monsters
        for(let i : number = 0; i< this.monstres.tab.length; i++){
            this.monstres.tab[i].drawObject(0, 0);
        }
        // All lasers
        for(let i : number = 0; i< this.laser.length; i++){
            this.laser[i].drawObject(0, 0);
        }
        this.drawShield();
    }

    public drawShield()
    {
        // All shield
        for(let i : number = 0; i< this.shields.length; i++){
            this.shields[i].drawObject(0, 0);
        }
    }

    public addPoint(Hpos : number, level : number)
    {
        if(level < 3){
            switch(Hpos){
                case 0:
                    return 5;
                case 1:
                    return 1;
            }
        }
        if(level < 4){
            switch(Hpos){
                case 0:
                    return 10;
                case 1:
                    return 5;
                case 2:
                    return 1;
            }
        }
        if(level < 5){
            switch(Hpos){
                case 0:
                    return 15;
                case 1:
                    return 10;
                case 2:
                    return 5;
                case 3:
                    return 1;
            }
        }
        if(level == 5){
            switch(Hpos){
                case 0:
                    return 10;
                case 1:
                    return 5;
                case 2:
                    return 1;
            }
        }
    }

    public sendBonus()
    {
        this.bonus = new Bonus(this.canvas, this.context, './images/monstre.png');
        this.bonus.drawObject(0,0);
        this.bonus.move_bonus(true, this.bonus.getDir().getX());
    }

    public keyRight() {
        this.hero.moveRight();
    }

    public keyLeft() {
        this.hero.moveLeft();
    }

    public monsterAttack()
    {
        let rand = Math.floor((Math.random() * this.monstres.tab.length));
        let monster_pos = this.monstres.tab[rand].getPos();
        let evil_laser : Laser = new Laser(this.canvas, this.canvas.getContext('2d'), './images/laser.png', monster_pos.getX() + (this.monstres.tab[rand].getWidth()/2), monster_pos.getY(), true)
        evil_laser.soundtrack.playSound();
        this.laser.push(evil_laser);
    }
    public keySpace() 
    {
        let current_hero_pos : Vector = this.hero.getPos();
        let laser : Laser = new Laser(this.canvas, this.context, './images/laser.png', current_hero_pos.getX() + (this.hero.getWidth()/2), current_hero_pos.getY(), false)
        laser.soundtrack.playSound();
        this.laser.push(laser);  
    }

    public getLevelScore() : number {
        return this.score; // A changer en temps voulu
    }

    public getLevelState() : string {
        return this.state; // TODO
    }

    public kill()
    {
        this.hit = true;
    }
}
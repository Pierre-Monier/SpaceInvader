/// <reference path='invaders.ts'/>
/// <reference path='hero.ts'/>
/// <reference path='monster.ts'/>
/// <reference path='laser.ts'/>

class Level {
    private canvas : HTMLCanvasElement;
    private context : CanvasRenderingContext2D;
    private monstres : Invaders;
    private laser : Array<Laser>;
    private hero : Hero;
    // savoir si le hero est sur la porte
    private ondoor : Boolean;
    // savoir sur il y a une collision
    private hit : Boolean;
    // savoir si un mosntre est touché
    private score : number;
    // etat du level
    private state : string;

    constructor(canvas : HTMLCanvasElement,
                context : CanvasRenderingContext2D,
                nb_m : number)
    {          
        this.canvas = canvas;
        this.context = context;
        this.hero = new Hero(canvas, context, './images/hero.png');
        let deca : number = 4;
        let j : number = 0;
        let speed : number = 2;
        this.monstres = new Invaders(deca, j, nb_m, this.canvas, speed);
        this.laser = [];
        this.ondoor = false;
        this.hit = false;
        this.score = 0;
        this.state = "En cours";
    }  

    public updateObjects()
    {
    let tmp_laser : Array<Laser> = [];
    let tmp_monstres : Array<Monster> = [];
    this.checkCollision();

    this.monstres.move(tmp_monstres);
    if(Math.floor((Math.random() * 100) + 1) == 50){
    this.monsterAttack();
    }
    this.monstres.tab = tmp_monstres;
        for(let i : number = 0; i< this.laser.length; i++){
            this.laser[i].move(false);
            if(this.laser[i].getTo_delete() == false){
                tmp_laser.push(this.laser[i]);
            }     
        }
        this.laser = tmp_laser; 
        // this.checkVictory(); 
    }
    private checkCollision()
    {
        for(let i : number = 0; i< this.laser.length; i++){
            for(let j : number = 0; j< this.monstres.tab.length; j++){
                if(this.laser[i].collision(this.monstres.tab[j])){
                    this.hero.yeah.playSound();
                    if(this.laser[i].getIs_monster() === false){
                        this.monstres.tab[j].setTo_delete(true);
                        this.laser[i].setTo_delete(true); 
                    }
                               
                    this.score = this.score + 1;            
                }
            }
        }
        for(let m : number = 0; m < this.monstres.tab.length; m++){
            if(this.hero.collision(this.monstres.tab[m])){
                this.hit = true;
            }
        }

    // end FOR
    }
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
    }

    public keyRight() {
        this.hero.moveRight();
    }

    public keyLeft() {
        this.hero.moveLeft();
    }

    public monsterAttack()
    {
        let evil_laser : Laser = this.monstres.shoot();
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
}
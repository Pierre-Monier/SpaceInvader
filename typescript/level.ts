/// <reference path='door.ts'/>
/// <reference path='hero.ts'/>
/// <reference path='monster.ts'/>
/// <reference path='laser.ts'/>

class Level {
    private canvas : HTMLCanvasElement;
    private context : CanvasRenderingContext2D;
    private monstres : Array<Monster>;
    private laser : Array<Laser>;
    private door : Door;
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

        console.log('nbr de monstre : '+nb_m)    
        this.canvas = canvas;
        this.context = context;
        this.door= new Door(canvas, context, './images/porte.png')
        this.hero = new Hero(canvas, context, './images/hero.png');
        this.monstres = [];
        this.laser = [];
        let deca : number = 4
        let j : number = 0;
        let i_tmp : number = deca;
        for(let i : number = 0; i< nb_m; i++){
            let monstre : Monster = new Monster(canvas, canvas.getContext('2d'),"./images/monstre.png", i_tmp, j);

            i_tmp++;
            if(this.canvas.width/monstre.getWidth() - deca < i_tmp){
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
    public updateObjects()
    {
    let tmp_laser : Array<Laser> = [];
    let tmp_monstres : Array<Monster> = [];
    this.checkCollision();
        for(let i : number = 0; i< this.monstres.length; i++){
            this.monstres[i].move(true);
            if(this.monstres[i].getTo_delete() == false){
                tmp_monstres.push(this.monstres[i]);
            }   
        }
        this.monstres = tmp_monstres;
        for(let i : number = 0; i< this.laser.length; i++){
            this.laser[i].move(false);
            if(this.laser[i].getTo_delete() == false){
                tmp_laser.push(this.laser[i]);
            }     
        }
        this.laser = tmp_laser; 
        this.checkVictory(); 
    }
    private checkCollision()
    {
        for(let i : number = 0; i< this.laser.length; i++){
            for(let j : number = 0; j< this.monstres.length; j++){
                if(this.laser[i].collision(this.monstres[j])){
                    this.hero.yeah.playSound();
                    this.monstres[j].setTo_delete(true);
                    this.laser[i].setTo_delete(true);            
                    this.score = this.score + 1;            
                }
            }
        }
        for(let m : number = 0; m < this.monstres.length; m++){
            if(this.hero.collision(this.monstres[m])){
                this.hit = true;
            }
        }
        if(this.hero.collision(this.door)){
            this.ondoor = true;
        }
    // end FOR
    }
    private checkVictory()
    {
        if(this.hit == true){
            this.state = "Perdu";
        }
        if(this.monstres.length == 0 && this.door.once == true){
            this.door.unlock();
            this.door.once = false;
        }
        if(this.ondoor == true && this.door.lock == true){
            this.state = "Gagné !";
        }
    }

    public drawObjects(x : number, y : number)
    {
        this.door.drawObject();
        this.hero.drawObject();
        // All monsters
        for(let i : number = 0; i< this.monstres.length; i++){
            this.monstres[i].drawObject(0, 0);
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

    public keySpace() {
        let current_hero_pos : Vector = this.hero.getPos();
        let laser : Laser = new Laser(this.canvas, this.context, './images/laser.png', current_hero_pos.getX() + (this.hero.getWidth()/2), current_hero_pos.getY())
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
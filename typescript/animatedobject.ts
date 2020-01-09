/// <reference path='vector.ts'/>

class AnimatedObject {
    protected canvas : HTMLCanvasElement;
    protected context : CanvasRenderingContext2D;
    protected img : HTMLImageElement;
    protected width : number;
    protected height : number;
    protected pos : Vector;
    protected dir : Vector;
    protected speed : number;
    private _to_delete : Boolean;

 

    constructor(canvas : HTMLCanvasElement,
                context : CanvasRenderingContext2D,
                src : string)
            {
            this.canvas = canvas;
            this.context = context;
            // Initialisation de img
            this.img = new Image(); 
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
    protected setSize(valW : number, valH : number)
            {
            this.width = valW;
            this.height = valH;
            }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    protected setPosition(x : number, y : number)
    // cree un nouvel objet Vector si attr pos est nul(initialise) sinon le modifie les valeurs
            {
                
                if(this.pos == null){
                    this.pos = new Vector(x, y);
                }else{
                    this.pos.setValues(x, y); 
                }
            }
    protected setDirection(x : number, y : number)
    // cree un nouvel objet Vector si attr pos est nul(initialise) sinon le modifie les valeurs
            {
                if(this.dir == null){
                    this.dir = new Vector(x, y);
                }else{
                    this.dir.setValues(x, y); 
                }
            }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    public move(update_dir  :  boolean)
// gère le déplacementde l’objet
            {
                // let x : number = this.pos.getX() + (this.dir.getX() * this.speed);
                // let y : number = this.pos.getY() + (this.dir.getY() * this.speed);
                let x : number = this.pos.getX() + (this.dir.getX() * this.speed);
                let y : number = this.pos.getY() + (this.dir.getY() * this.speed);
                let test_x = (this.canvas.width - this.width);
                let test_y = (this.canvas.height - this.height);

                if(this.pos.getX() >= test_x || this.pos.getX() <= 0){
                    x = this.pos.getX() - (this.dir.getX() * this.speed);
                    if(update_dir == false){
                        this.setDirection(0, 0);
                    }else{
                        this.setDirection(-this.dir.getX(), this.dir.getY());
                    }   
                }
                if(this.pos.getY() +1 >= test_y || this.pos.getY() +1 <= 0){
                    y = this.pos.getY() - (this.dir.getY() * this.speed);
                    if(update_dir == false){
                        this.setDirection(0, 0); 
                    }else{
                    this.setDirection(this.dir.getX(), -this.dir.getY());
                    }
                }   
            if(x < 0){
                x = 1;
            }else if(x > test_x){
                x = test_x -1
            }
                this.pos.setValues(x, y);
            }
// A decommenter en temps voulu
    public drawObject(x : number, y : number)
    {
            this.context.drawImage(this.img,                 // image a afficher
                x, y,                     // rect A, coin haut gauche
                this.width, this.height,  // rect A, taille
                this.pos.getX(), this.pos.getY(),   // rect B, coin haut gauche
                this.width, this.height); // rect B, taille
    }
    public getRandomInt(min : number, max : number) 
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    public getTo_delete()
    {
        return this._to_delete;
    }
    public setTo_delete(to_delete : Boolean)
    {
        this._to_delete = to_delete;
    }
    public  collision(other  : AnimatedObject)
    {
    let x1 : number = this.pos.getX();
    let x2 : number = other.pos.getX();
    let y1 : number = this.pos.getY();
    let y2 : number = other.pos.getY();
    
        if(x1 < x2 + other.width &&
           x1 + this.width > x2 &&
           y1 < y2 + other.height &&
           y1 +this.height > y2){
            return true
        }else{
            return false;
        }
    }

    getWidth()
    {
        return this.width;
    }
    getSpeed()
    {
        return this.speed;
    }
    getPos()
    {
        return this.pos
    }
    getDir()
    {
        return this.dir;
    }
    getImg()
    {
        return this.img;
    }
    
    
    //////////////////
}
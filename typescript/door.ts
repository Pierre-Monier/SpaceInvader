/// <reference path='multisprites.ts'/>
/// <reference path='sound.ts'/>

class Door extends MultiSprites implements Speaking {

    public lock : Boolean;
    private open : Vector;
    private close : Vector;
    public son : Sound;
    public once : Boolean;

    constructor(canvas : HTMLCanvasElement,
        context : CanvasRenderingContext2D,
        src : string)
    {
        super(canvas,context,src);
        this.width = 60;
        this.height = 60;
        this.pos = new Vector(this.getRandomInt(0, this.canvas.width - this.width), this.getRandomInt(0, this.canvas.height - this.height));
        this.lock = false;
        this.open = new Vector(100, 0);
        this.close = new Vector(0, 0);
        this.son = new Sound('./sounds/son_door_open.wav');
        this.once = true;
    }

    public drawObject()
    {
        // close door
        if(this.lock == true){
            super.drawObject( this.open.getX(), this.open.getY());
        }else{
            super.drawObject( this.close.getX(), this.close.getY()); 
        }

    }
    public unlock(){
        this.lock = true;
        this.son.playSound();
    }
}